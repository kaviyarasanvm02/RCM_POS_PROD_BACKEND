
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const hana = require('@sap/hana-client');

const conn = hana.createConnection();

const connParams = {
  serverNode: `${process.env.HANA_HOST}:${process.env.HANA_PORT}`,
  uid: process.env.HANA_USER,
  pwd: process.env.HANA_PASSWORD
};

const CompanyDB = process.env.SERVICE_LAYER_COMPANYDB;

const sql = `
  SELECT TOP 15
    T0."ItemCode",
    T1."ItemName",
    T0."OnHand",
    T0."WhsCode"
  FROM ${CompanyDB}.OITW T0
  INNER JOIN ${CompanyDB}.OITM T1 ON T0."ItemCode" = T1."ItemCode"
  WHERE T0."WhsCode" = 'B203'
    AND T0."OnHand" > 0
    AND T1."frozenFor" = 'N'
  ORDER BY T0."OnHand" DESC
`;

conn.connect(connParams, (err) => {
  if (err) {
    console.error('Connection error:', err);
    process.exit(1);
  }

  conn.exec(sql, (err, rows) => {
    if (err) {
      console.error('Query error:', err);
      conn.disconnect();
      process.exit(1);
    }

    console.log(`\n=== Top 15 Stocked Items in B203 - BA TIMBER YARD ===\n`);
    console.log(`${'#'.padEnd(4)} ${'Item Code'.padEnd(20)} ${'Item Name'.padEnd(50)} ${'On Hand'.padEnd(12)}`);
    console.log('-'.repeat(90));

    rows.forEach((row, idx) => {
      const itemName = (row.ItemName || '').substring(0, 48);
      console.log(`${(idx+1).toString().padEnd(4)} ${row.ItemCode.padEnd(20)} ${itemName.padEnd(50)} ${parseFloat(row.OnHand).toFixed(2).padEnd(12)}`);
    });

    console.log(`\nTotal items returned: ${rows.length}`);

    conn.disconnect();
  });
});
