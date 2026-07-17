const hana = require("@sap/hana-client");
const { dbConfig } = require("../config/hana-db");

//TODO: Need to remove this method and rename executeWithValues as 'executeQuery'
const executeQuery = (sql, callback) => {
  try {
    const rows = executeWithValues(sql, []);
    callback(null, rows);
  } catch (err) {
    callback(err, null);
  }
}

const executeWithValues = (sql, values = [], _retryCount = 0) => {
  // console.log("executeWithValues: sql - values: %s - %s", sql, values);

  /*NOTE: If the value is not sent as array, below error is thrown
  Invalid parameter for function 'exec[ute](sql[, params][, options][, callback])'
  */
  //change it to an array if it is not an Array
  if (!Array.isArray(values)) {
    values = [values];
  }

  // HANA connection error codes that indicate a transient network/restart issue
  // rc=10060: connection timeout, rc=10054: forcibly closed, rc=10051: unreachable network, rc=10053: connection aborted
  const HANA_TRANSIENT_RC_CODES = ['rc=10060', 'rc=10054', 'rc=10051', 'rc=10053'];
  const MAX_RETRIES = 3;
  const RETRY_DELAY_MS = 2000; // 2 seconds base delay

  let conn;
  try {
    conn = hana.createConnection();
    conn.connect(dbConfig);
    const rows = conn.exec(sql, values);
    return rows;
  }
  catch (err) {
    const errMsg = err && err.message ? err.message : '';
    const isTransient = HANA_TRANSIENT_RC_CODES.some(code => errMsg.includes(code));

    // Auto-retry on transient HANA connection failures (network blip / server restart)
    if (isTransient && _retryCount < MAX_RETRIES) {
      const delayMs = RETRY_DELAY_MS * (_retryCount + 1);
      console.warn(`⚠️ HANA connection failed (attempt ${_retryCount + 1}/${MAX_RETRIES}), retrying in ${delayMs}ms... Error: ${errMsg.substring(0, 100)}`);

      // Synchronous sleep (acceptable here since db.js is already synchronous)
      const start = Date.now();
      while (Date.now() - start < delayMs) { /* busy wait */ }

      return executeWithValues(sql, values, _retryCount + 1);
    }

    // Detect HANA server unreachable (rc=10060 = connection timeout)
    if (err && err.message && err.message.includes('rc=10060')) {
      const hanaErr = new Error(
        `🔴 HANA DB SERVER UNREACHABLE: Cannot connect to ${process.env.HANA_HOST}:${process.env.HANA_PORT}. Original: ${err.message}`
      );
      hanaErr.isHanaDown = true;
      console.error("executeWithValues: HANA DB is DOWN after " + MAX_RETRIES + " retries - " + JSON.stringify(err));
      throw hanaErr;
    }
    console.error("executeWithValues: " + JSON.stringify(err));
    throw err;
  }
  finally {
    // ✅ ALWAYS return connection to pool — even if query fails
    if (conn) {
      try { conn.disconnect(); } catch (e) { /* ignore disconnect errors */ }
    }
  }
}

const executeBatchInsertUpdate = (sql, values) => {
  //console.log("executeBatchInsertUpdate: sql - values: %s - %s", sql, values);

  if (!values.length) {
    return 0; //return '0' rows if 'values' is empty
  }

  let conn;
  try {
    conn = hana.createConnection();
    conn.connect(dbConfig);
    const stmt = conn.prepare(sql);
    const rows = stmt.execBatch(values);
    return rows;
  }
  catch (err) {
    console.error("executeBatchInsertUpdate: " + JSON.stringify(err));
    throw err;
  }
  finally {
    // ✅ ALWAYS return connection to pool — even if query fails
    if (conn) {
      try { conn.disconnect(); } catch (e) { /* ignore disconnect errors */ }
    }
  }
}

module.exports = { executeQuery, executeWithValues, executeBatchInsertUpdate };