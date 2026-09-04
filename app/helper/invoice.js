const dbHelper = require('../helper/db');
const { buildHeaderRecQuery, buildRowLevelQuery } = require("../utils/query.util.js");
const query = require("../config/query-invoice.js");
const { getQRCodeDataURI } = require("../utils/qr-code.util.js");
const { serviceLayerAPI } = require("../config/service-layer-api");
const { getSLConnection } = require("./service-layer-login.js");
const axios = require("axios");
const https = require("https");

/**
 * Fetch Invoice details from SAP Service Layer
 * UPDATED: Fixed connection URL and SSL issues
 */
exports.getInvoiceByDocEntry = async (docEntry, req = null) => {
  try {
    if (!docEntry && docEntry !== 0) {
      throw new Error("Invalid docEntry passed to getInvoiceByDocEntry");
    }

    // 1. Determine Base URL (Use Env or Fallback to your IP)
    const baseURL = process.env.SERVICE_LAYER_API_BASE_URL || "http://172.18.30.114:50001/b1s/v1";
    const url = `${baseURL}/Invoices(${docEntry})`;

    // 2. Create SSL Agent to ignore self-signed cert errors
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false
    });

    // 3. Get Cookie
    const cookie = await getSLConnection(req);
    if (!cookie) throw new Error("Could not retrieve SL Cookie");

    let response;

    try {
      console.log(`[Invoice Helper] Fetching status: ${url}`);

      response = await axios({
        method: "GET",
        url,
        httpsAgent: httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie,
        },
        timeout: 15000,
      });

      return response.data;
    } catch (err) {
      // If SAP session expired (401), login again and retry once
      if (err.response?.status === 401) {
        console.log("🔁 SAP Session expired — re-logging and retrying...");
        const newCookie = await getSLConnection(req);

        const retry = await axios({
          method: "GET",
          url,
          httpsAgent: httpsAgent,
          headers: {
            "Content-Type": "application/json",
            Cookie: newCookie,
          },
          timeout: 15000,
        });

        return retry.data;
      }

      throw err;
    }

  } catch (err) {
    const sapError = err.response?.data?.error?.message?.value || err.message;
    console.log("getInvoiceByDocEntry - SL Error:", sapError);
    throw new Error(sapError);
  }
};


/**
 * Get the list of all Invoices
 * @param {Object} req  `req.fromDate, req.toDate, req.cardCode, req.docStatus, req.searchKey,
 *                      req.pageNum, req.pageSize`
 */
exports.getInvoices = (req) => {
  try {
    const sql = buildHeaderRecQuery(query.invoice, req, [`T0."U_CODCntName"`]);
    console.log("getSalesQuotation- sql: ", sql);
    const rows = dbHelper.executeWithValues(sql);
    // console.log("getSalesQuotation- rows: "+JSON.stringify(rows));
    return rows;
  }
  catch (err) {
    console.log("getInvoices - controller - error: " + JSON.stringify(err.message));
    throw err;
  }
}

exports.updateInvoiceReprintStatus = (docEntry) => {
  try {
    //const sql = buildHeaderRecQuery(query.invoice, req, [`T0."U_CODCntName"`]);
    const rows = dbHelper.executeWithValues(query.updateInvoiceReprintStatus, [docEntry]);
    console.log("updateInvoiceReprintStatus %s", JSON.stringify(rows));
    return true;
  }
  catch (err) {
    console.log("getInvoices - controller - error: " + JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Get the list of Items under an Invoice
 * @param {Object} req   `req.docNum, req.lineStatus`
 */
exports.getItemDetails = (req) => {
  try {
    const sql = buildRowLevelQuery(query.itemListForInvoice, req);
    const itemsList = dbHelper.executeWithValues(sql, []);
    // console.log("getItemDetails- controller: "+JSON.stringify(itemsList));
    return { itemsList };
  }
  catch (err) {
    console.log("getItemDetails - controller - error: " + JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Get the list of Timber Items under an Invoice
 * @param {Object} req   `req.docEntry`
 */
exports.getTimberItemDetails = (docEntry) => {
  try {
    const sql = query.getTimberItems;
    const itemsList = dbHelper.executeWithValues(sql, [docEntry]);
    // console.log("getTimberItemDetails- controller: "+JSON.stringify(itemsList));
    return { itemsList };
  }
  catch (err) {
    console.log("getTimberItemDetails - controller - error: " + JSON.stringify(err.message));
    throw err;
  }
}

exports.getAttachmentEntry = (docEntry) => {
  try {
    const results = dbHelper.executeWithValues(query.invoiceAttachmentEntry, [docEntry]);
    if (Array.isArray(results) && results.length > 0) {
      return results[0];
    }
    return null;
  } catch (err) {
    console.log("getAttachmentEntry - controller - error: " + JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Get the FIRCA Verification Info for an Invoice
 * @param {Number} docNum
 */
exports.getFircaInfo = (docNum) => {
  try {
    const results = dbHelper.executeWithValues(query.invoiceFircaURL, [docNum]);
    if (Array.isArray(results) && results.length > 0) {
      return results[0];
    }
    return null;
  }
  catch (err) {
    console.log("getFircaInfo - controller - error: " + JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Get the Delivery Code Info for an Invoice
 * @param {Number} docNum
 */
exports.getDeliveryInfo = (docNum) => {
  try {
    const results = dbHelper.executeWithValues(query.invoiceDeliveyCodeData, [docNum]);
    if (Array.isArray(results) && results.length > 0) {
      return results[0];
    }
    return null;
  }
  catch (err) {
    console.log("getDeliveryInfo - controller - error: " + JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Get the FIRCA Verification Info for an Invoice
 * @param {Number} docNum
 */
exports.getUDFInfo = (docNum) => {
  try {
    const results = dbHelper.executeWithValues(query.invoiceUDFData, [docNum]);
    if (Array.isArray(results) && results.length > 0) {
      return results[0];
    }
    return null;
  }
  catch (err) {
    console.log("getUDFInfo - controller - error: " + JSON.stringify(err.message));
    throw err;
  }
}



/** 
 * Update the TransRef field by reference Info for an IP
 * @param {ipDocEntry, referenece} - incoming payment, reference
 */
exports.updateTransRef = (ipDocEntry, referenece) => {
  try {
    const results = dbHelper.executeWithValues(query.updateTransRef, [referenece, ipDocEntry]);
    return results;
  }
  catch (err) {
    console.log("updateTransRef - controller - error: " + JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Get the FIRCA QR Code for an Invoice
 * @param {Number} docNum
 */
exports.getFircaQRCodeDataURI = async (docNum) => {
  try {
    const results = this.getFircaInfo(docNum);
    console.log("getFircaQRCode - url: " + JSON.stringify(results));

    let qrCodeBase64;
    if (results && results.U_VerifyURL) {
      qrCodeBase64 = await getQRCodeDataURI(results.U_VerifyURL);
    }
    return qrCodeBase64;
  }
  catch (err) {
    console.log("getFircaQRCode - helper: " + JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Get the Delivery Code for an Invoice
 * @param {Number} docNum
 */
exports.getDeliveryCode = async (docNum) => {
  try {
    const results = this.getDeliveryInfo(docNum);
    console.log("get Delivery Code: " + JSON.stringify(results));
    return results;
  }
  catch (err) {
    console.log("getDeliveryCode - helper: " + JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Get the FIRCA QR Code for an Invoice
 * @param {Number} docNum
 */
exports.getUDFData = async (docNum) => {
  try {
    const results = this.getUDFInfo(docNum);
    console.log("get UDF Data: " + JSON.stringify(results));
    return results;
  }
  catch (err) {
    console.log("get UDF Data - helper: " + JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Updates the Remaining Qty in the Invoice Rows
 * @param {Array} req
 */
exports.updateRemainingQuantity = (req) => {
  try {
    if (Array.isArray(req) && req.length > 0) {
      const updateRequest = req.map(item => {
        return [
          item.U_ReturnedQty !== null && item.U_ReturnedQty !== undefined ? Number(item.U_ReturnedQty) : null,
          item.U_RemainingOpenQty !== null && item.U_RemainingOpenQty !== undefined ? Number(item.U_RemainingOpenQty) : null,
          Number(item.DocEntry),
          Number(item.LineNum)
        ];
      });

      console.log("updateRemainingQuantity- updateRequest: " + JSON.stringify(updateRequest));
      const response = dbHelper.executeBatchInsertUpdate(query.updateInvoiceItem, updateRequest);
      console.log("updateRemainingQuantity- response: " + JSON.stringify(response));
      return response;
    }
    return null;
  }
  catch (err) {
    console.log("getItemDetails - controller - error: " + JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Updates the Invoice Reprit Status in the Invoice Rows
 * @param {Array} docEntry
 */
exports.updateReprint = (docEntry) => {
  try {
    if (docEntry) {
      const rows = dbHelper.executeWithValues(query.updateInvoiceReprintStatus, [docEntry]);
      console.log("updateInvoiceReprintStatus %s", JSON.stringify(rows));
      return true;
    }
    return null;
  }
  catch (err) {
    console.log("InvoiceReprintStatus - controller - error: " + JSON.stringify(err.message));
    throw err;
  }
}

exports.updateSalesBatchSelection = (item, docEntry) => {
  try {
    console.log("updateSalesBatchSelection %s %s %s %s", item.DocNum, docEntry, item.U_ItemCode, item.U_LineNum);
    if (item) {
      const rows = dbHelper.executeWithValues(query.updateSalesBatchSelectionDocNum, [item.DocNum, docEntry, item.U_ItemCode, item.U_LineNum]);
      console.log("updateSalesBatchSelection %s", JSON.stringify(rows));
      return true;
    }
    return null;
  }
  catch (err) {
    console.log("InvoiceReprintStatus - controller - error: " + JSON.stringify(err.message));
    throw err;
  }
}

// Here we get the unique id from the invoice 

exports.getUniqueId = (uniqueId) => {
  try {
    const results = dbHelper.executeWithValues(query.getUniqueId, [uniqueId]);
    if (Array.isArray(results) && results.length > 0) {
      return results[0];
    }
    return null;
  }
  catch (err) {
    console.log("getNumberingSeries - Helper - error: " + JSON.stringify(err.message));
    throw err;
  }
}
exports.getAttachmentPath = () => {
  try {
    const results = dbHelper.executeWithValues(query.AttachmentPath);
    if (Array.isArray(results) && results.length > 0) {
      return results[0];
    }
    return null;
  } catch (err) {
    console.log("getAttachmentPath - Helper - error: " + JSON.stringify(err.message));
    throw err;
  }
}

/**
 * Get the allowed discount for a specific Sales Employee
 * @param {Number} slpCode 
 */
exports.getSalesEmployeeDiscount = (slpCode) => {
  try {
    const results = dbHelper.executeWithValues(query.getSalesEmployeeDiscount, [slpCode]);
    if (Array.isArray(results) && results.length > 0) {
      return results[0].SalesDisc;
    }
    return 0;
  } catch (err) {
    console.log("getSalesEmployeeDiscount - helper - error: " + JSON.stringify(err.message));
    return 0;
  }
}

/**
 * Updates Manufacturer Serial Number (MnfSerial) in OSRN for a Serial Item
 * @param {String} itemCode 
 * @param {String} internalSerialNumber 
 * @param {String} mfgSerialNumber 
 */
exports.updateMfgSerialNumber = (itemCode, internalSerialNumber, mfgSerialNumber) => {
  try {
    if (internalSerialNumber && mfgSerialNumber !== undefined && mfgSerialNumber !== null) {
      const rows = dbHelper.executeWithValues(query.updateMfgSerialNumber, [mfgSerialNumber, internalSerialNumber, itemCode, itemCode]);
      console.log(`[BACKEND] updateMfgSerialNumber result for ${internalSerialNumber} (${itemCode}):`, JSON.stringify(rows));
      return true;
    }
    return null;
  } catch (err) {
    console.error(`[BACKEND] updateMfgSerialNumber error for ${internalSerialNumber}:`, err.message);
    return null;
  }
}

