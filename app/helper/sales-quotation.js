const dbHelper = require('../helper/db.js');
const { buildHeaderRecQuery, buildRowLevelQuery} = require("../utils/query.util.js");
const query = require("../config/query-sales-quotation.js");

/**
 * Get the list of all Sales Quotation
 * @param {Object} req  `req.fromDate, req.toDate, req.cardCode, req.docStatus, req.searchKey,
 *                      req.pageNum, req.pageSize`
 */
exports.getSalesQuotation = (req) => {
  try {
    const sql = buildHeaderRecQuery(query.salesQuotationQuery, req);
    console.log("getSalesQuotation- sql: ", sql);
    const rows = dbHelper.executeWithValues(sql);
    // console.log("getSalesQuotation- rows: "+JSON.stringify(rows));
    return rows;
  }
  catch (err) {
    console.log("getSalesQuotation - controller - error: "+ JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Get the list of Items for a passed Sales Quotation
 * @param {Object} req   `req.docNum, req.lineStatus`
 */
exports.getItemDetails = (req) => {
  try {
    const sql = buildRowLevelQuery(query.itemListForSalesQuotation, req);
    const itemsList = dbHelper.executeWithValues(sql, []);
    
    // For each item, if it has a U_TallySheet, fetch the rows from @TSH1
    itemsList.forEach(item => {
      if (item.U_TallySheet) {
        const tallyRowsSql = query.tallySheetRowsQuery;
        const tallyRows = dbHelper.executeWithValues(tallyRowsSql, [item.U_TallySheet]);
        if (Array.isArray(tallyRows) && tallyRows.length > 0) {
          item.timberTallyRows = tallyRows;
          // Also provide a formatted timberTally object for compatibility with common logic
          item.timberTally = [{
            TSH1Collection: tallyRows
          }];
        }
      }
    });

    return { itemsList };
  }
  catch (err) {
    console.log("getItemDetails - controller - error: "+ JSON.stringify(err.message));
    throw err;
  }
}

exports.updateSQSalesBatchSelection = (item, docEntry) => {
  try {
    console.log("updateSQSalesBatchSelection %s", item.DocNum, docEntry, item.U_ItemCode);
    if(item) {
      const rows = dbHelper.executeWithValues(query.updateSQSalesBatchSelectionDocNum, [item.DocNum, docEntry, item.U_ItemCode]);
      console.log("updateSQSalesBatchSelection %s", JSON.stringify(rows));
      return true;
    }
    return null;
  }
  catch (err) {
    console.log("updateSQSalesBatchSelection - helper - error: "+ JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Updates the Sales Quotation Reprit Status in the Sales Quotation Header
 * @param {Number} docEntry
 */
exports.updateReprint = (docEntry) => {
  try {
    if(docEntry) {
      const rows = dbHelper.executeWithValues(query.updateSalesQuotationReprintStatus, [docEntry]);
      console.log("updateSalesQuotationReprintStatus %s", JSON.stringify(rows));
      return true;
    }
    return null;
  }
  catch (err) {
    console.log("SalesQuotationReprintStatus - helper - error: "+ JSON.stringify(err.message));
    throw err;
  }
}

/**
 * Get the list of Timber Tally items (lengths/dimensions)
 * @param {Object} req `req.itemCode`
 */
exports.getTimberTallyItems = (req) => {
  try {
    const { itemCode, whsCode, binCode } = req;
    console.log("binCode from req:", binCode);
    const sql = query.timberTallyItemsQuery;
    // Pass parameters for: OITM join, OBTN itemCode, WhsCode (x3), BinCode (x3)
    const params = [
      itemCode, 
      itemCode, 
      whsCode || "", whsCode || "", 
      binCode || "", binCode || ""
    ];
    console.log("getTimberTallyItems - params: ", params);
    const rows = dbHelper.executeWithValues(sql, params);
    console.log("getTimberTallyItems - rows returned: ", rows?.length || 0);
    if (rows && rows.length > 0) {
      console.log("getTimberTallyItems - results sample: ", JSON.stringify(rows[0]));
    }
    
    // Add debug log for raw warehouse stock
    if (rows && rows.length > 0 && rows[0].U_AvlPcs === "0") {
        console.log("DEBUG - Found zero pieces. Row sample:", JSON.stringify(rows.find(r => r.U_AvlPcs !== "0") || rows[0]));
    }

    return rows;
  }
  catch (err) {
    console.log("getTimberTallyItems - helper - error: " + JSON.stringify(err.message));
    throw err;
  }
}

exports.getUniqueId = (uniqueId) => {
  try {
    const sql = query.getUniqueId;
    const rows = dbHelper.executeWithValues(sql, [uniqueId]);
    return rows && rows.length > 0 ? rows[0] : null;
  }
  catch (err) {
    console.log("getUniqueId - helper - error: " + JSON.stringify(err.message));
    throw err;
  }
}