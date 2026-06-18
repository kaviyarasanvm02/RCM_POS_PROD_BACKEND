const dbHelper = require("../../helper/db");
const { dbCreds } = require("../../config/hana-db");
exports.getBomChildren = async (father) => {
  const sql = `
    SELECT 
      T0."Father" AS "ParentItem", 
      T0."Code" AS "ItemCode", -- Mapped cleanly to ItemCode for the POS
      T0."Quantity" AS "BomQuantity",
      T1."ItemName",
      T1."InvntryUom",
      T1."ManBtchNum",
      T1."ManSerNum"
    FROM ${dbCreds.CompanyDB}.ITT1 T0
    INNER JOIN ${dbCreds.CompanyDB}.OITM T1 ON T0."Code" = T1."ItemCode"
    WHERE T0."Father" = ?
  `;
  return await dbHelper.executeWithValues(sql, [father]);
};
