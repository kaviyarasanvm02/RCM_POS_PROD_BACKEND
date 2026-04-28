const dbHelper = require('../helper/db.js');
const query = require("../config/query-misc.js");

/**
 * Get the list of Active Sales Employees
 */
exports.getSalesEmployees = (storeLocation, userCode) => {
  try {
    let sql;
    sql = query.selectSalesEmployees;
    if(storeLocation){
      sql = sql + `AND T0."Fax" IN ('${storeLocation}')`
    }
    if(userCode){
      sql = sql + `AND UPPER(T0."U_POSUser") IN  (UPPER('${userCode}'))`
    }
    console.log("Sql:", sql);
    const rows = dbHelper.executeWithValues(sql);
    // console.log("getSalesEmployees- rows: "+JSON.stringify(rows));
    return rows;
  }
  catch (err) {
    console.log("getSalesEmployees - controller - error: "+ JSON.stringify(err.message));
    throw err;
  }
}
