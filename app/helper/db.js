const hana = require("@sap/hana-client");
const { dbConfig } = require("../config/hana-db");

//TODO: Need to remove this method and rename executeWithValues as 'executeQuery'
const executeQuery = (sql, callback) => {
  const conn = hana.createConnection();

  conn.connect(dbConfig, async (err) => {
    if (err) {
      console.error(err);
      callback(err, null);
    }
    conn.exec(sql, (err, rows) => {
      if (err) {
        console.error(err);
        callback(err, null);
      }
      callback(null, rows);
      //console.log("rows: "+ JSON.stringify(rows));
      conn.disconnect((err) => {
        if (err)
          console.error(err);
      });
      //results = rows;
    });
    //console.log("results: "+ JSON.stringify(results));
  });
}

const executeWithValues = (sql, values=[]) => {
  // console.log("executeWithValues: sql - values: %s - %s", sql, values);

  /*NOTE: If the value is not sent as array, below error is thrown
  Invalid parameter for function 'exec[ute](sql[, params][, options][, callback])'
  */
  //change it to an array if it is not an Array
  if(!Array.isArray(values)) {
    values = [values];
  }

  let conn;
  try {
    conn = hana.createConnection();
    conn.connect(dbConfig);
    const rows = conn.exec(sql, values);
    return rows;
  }
  catch (err) {
    // Detect HANA server unreachable (rc=10060 = connection timeout)
    if (err && err.message && err.message.includes('rc=10060')) {
      const hanaErr = new Error(
        `🔴 HANA DB SERVER UNREACHABLE: Cannot connect to ${process.env.HANA_HOST}:${process.env.HANA_PORT}. Original: ${err.message}`
      );
      hanaErr.isHanaDown = true;
      console.error("executeWithValues: HANA DB is DOWN - " + JSON.stringify(err));
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