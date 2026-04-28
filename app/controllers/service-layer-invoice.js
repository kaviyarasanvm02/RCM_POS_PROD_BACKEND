const { getSLConnection, invalidateSLCache } = require("../helper/service-layer-login.js");
const serviceLayerHelper = require("../helper/service-layer-invoice.js");
const serviceLayerIPHelper = require("../helper/service-layer-incoming-payment.js");
const serviceLayerSBSHelper = require("../helper/service-layer-sales-batch-selection.js");
const { updateOSBSForQuotation } = serviceLayerSBSHelper;
const serviceLayerJEHelper = require("../helper/service-layer-journal-entry.js");
const cashDenominationService = require("../entities/services/cash-denominations.service.js")
const { formatDate } = require("../utils/utils.js");
const { trxTypes, defaultBranchId, fircaIntegrationWaitTime, enableFircaIntegration, objectCodes, portalModules, enableStoreBasedNumbering, isHomeDeliveryEnabled } = require("../config/config.js");
const { submitInvoicetoFirca } = require("../helper/invoice-to-firca.js");
const { getFircaQRCodeDataURI, getUDFData, updateSalesBatchSelection, updateTransRef, getUniqueId, getItemDetails, getTimberItemDetails, getSalesEmployeeDiscount } = require("../helper/invoice.js");
const { getNumberingSeries } = require("../helper/numbering-series.js");

// Here we create a new activeInvoiceRequests map to store the active invoice requests
const activeInvoiceRequests = new Map();

const create = async (req, res, next) => {
  let uniqueID = null;
  try {
    // Detect multipart/form-data and parse JSON strings
    if (typeof req.body.request === 'string') {
      const parsedRequest = JSON.parse(req.body.request);
      Object.assign(req.body, parsedRequest);
    }
    if (typeof req.body.invoice === 'string') {
      req.body.invoice = JSON.parse(req.body.invoice);
    }
    if (typeof req.body.incomingPayment === 'string') {
      req.body.incomingPayment = JSON.parse(req.body.incomingPayment);
    }
    if (typeof req.body.salesBatchSelection === 'string') {
      req.body.salesBatchSelection = JSON.parse(req.body.salesBatchSelection);
    }
    if (typeof req.body.journalEntry === 'string') {
      req.body.journalEntry = JSON.parse(req.body.journalEntry);
    }

    if (req.body.invoice) {
      uniqueID = req.body.invoice.Unique;
      if (uniqueID) {
        if (activeInvoiceRequests.has(uniqueID)) {
          console.error(`[BACKEND] Concurrent request detected for TransactionID: ${uniqueID}. Blocking.`);
          return res.status(409).send({ message: "Transaction already processing. Please wait." }); // Here we return 409 status code to the client and block the request
        }
        activeInvoiceRequests.set(uniqueID, true); // Here we add the active invoice request to the map
      }

      console.time("2. [BACKEND] Total Invoice Create API Duration");
      let response = {};
      let ipDocEntry = "";
      let uniqueData = {};

      console.time("2.1 [BACKEND] Parallel DB Queries");

      const cookiePromise = getSLConnection(req);

      let generateDeliveryCode;
      const request = req.body.invoice;

      // 🔹 ENFORCE USER-LEVEL DISCOUNT LIMIT (HARDENING)
      let allowedDisc = parseFloat(req.session.userSessionLog?.salesDisc || 0);

      // 🔹 FALLBACK: If session limit is 0 or missing, check the specific Sales Employee limit from SAP
      if (allowedDisc === 0 && request.SalesPersonCode) {
        try {
          const slpDisc = getSalesEmployeeDiscount(request.SalesPersonCode);
          if (slpDisc > 0) {
            console.log(`[BACKEND] Discount Fallback: Using SalesPerson ${request.SalesPersonCode} limit: ${slpDisc}%`);
            allowedDisc = parseFloat(slpDisc);
          }
        } catch (fErr) {
          console.error("[BACKEND] Discount Fallback failed:", fErr.message);
        }
      }

      if (Array.isArray(request.DocumentLines)) {
        for (const line of request.DocumentLines) {
          const lineDisc = parseFloat(line.DiscountPercent || 0);
          if (lineDisc > allowedDisc) {
            console.error(`[BACKEND] Discount Limit Violation: Item ${line.ItemCode} has ${lineDisc}% but user only allowed ${allowedDisc}%`);
            return res.status(400).send({
              message: `Discount Limit is Exceeded: ${allowedDisc}% (Item: ${line.ItemCode})`
            });
          }
        }
      }

      const companyCode = request.CompanyCode ? request.CompanyCode : "";
      if (typeof isHomeDeliveryEnabled !== "undefined" && isHomeDeliveryEnabled && request.U_IsHomeDelivery === "Y") {
        generateDeliveryCode = Math.floor(100000 + Math.random() * 900000);
        request.U_DeliveryCode = generateDeliveryCode;
      }

      let seriesPromise = Promise.resolve(null);
      if (typeof enableStoreBasedNumbering !== "undefined" && enableStoreBasedNumbering) {
        seriesPromise = getNumberingSeries(objectCodes[portalModules.INVOICE], req.session.userSessionLog.storeLocation);
      }

      let uniquePromise = getUniqueId(request.Unique);

      let ipSeriesPromise = Promise.resolve(null);
      if (req.body.incomingPayment && typeof enableStoreBasedNumbering !== "undefined" && enableStoreBasedNumbering) {
        ipSeriesPromise = getNumberingSeries(objectCodes[portalModules.INCOMING_PAYMENT], req.session.userSessionLog.storeLocation);
      }

      const [cookie, seriesResponse, uniqueResponse, ipSeriesResponse] = await Promise.all([cookiePromise, seriesPromise, uniquePromise, ipSeriesPromise]);

      console.timeEnd("2.1 [BACKEND] Parallel DB Queries");

      if (seriesResponse) {
        console.log("seriesResponse series:", seriesResponse.Series)
        request.Series = seriesResponse.Series;
      }

      if (!uniqueResponse?.DocNum) {
        //request.BPL_IDAssignedToInvoice = branchId;
        // If creating invoice from a Sales Quotation with timber batch selection,
        // update the quotation's OSBS tally records BEFORE creating the invoice.
        // This prevents SAP error 4021 (Tally sheet and batch selection mismatch)
        // which occurs when a stored procedure validates the OSBS against the invoice.
        if (req.body.sqDocNum && Array.isArray(req.body.salesBatchSelection) && req.body.salesBatchSelection.length > 0) {
          console.log("[BACKEND] Updating OSBS for source SQ DocNum:", req.body.sqDocNum);
          try {
            const updateOSBSResult = await updateOSBSForQuotation(req.body.sqDocNum, req.body.salesBatchSelection, cookie);
            console.log("[BACKEND] OSBS update result:", JSON.stringify(updateOSBSResult));
          } catch (osbesErr) {
            console.warn("[BACKEND] OSBS pre-update failed (non-fatal):", osbesErr.message);
          }
        }

        // 1. Defensive Batch Aggregation: Deduplicate and sum quantities for repeated batch numbers.
        // SAP does not tolerate the same BatchNumber appearing more than once per line.
        if (Array.isArray(request.DocumentLines)) {
          request.DocumentLines.forEach(line => {
            if (Array.isArray(line.BatchNumbers) && line.BatchNumbers.length > 0) {
              const aggregated = [];
              const map = new Map();
              line.BatchNumbers.forEach(bn => {
                const key = `${bn.BatchNumber}_${bn.BaseLineNumber}`;
                if (map.has(key)) {
                  map.get(key).Quantity = parseFloat((map.get(key).Quantity + bn.Quantity).toFixed(5));
                } else {
                  const copy = { ...bn };
                  map.set(key, copy);
                  aggregated.push(copy);
                }
              });
              line.BatchNumbers = aggregated;

              // 2. Rebuild Bin Allocations to match the new 1:1 batch indices
              if (Array.isArray(line.DocumentLinesBinAllocations) && line.DocumentLinesBinAllocations.length > 0) {
                const binAbs = line.DocumentLinesBinAllocations[0].BinAbsEntry;
                line.DocumentLinesBinAllocations = aggregated.map((batch, index) => ({
                  BinAbsEntry: binAbs,
                  Quantity: batch.Quantity,
                  SerialAndBatchNumbersBaseLine: index,
                  BaseLineNumber: batch.BaseLineNumber
                }));
              }
            }
          });
        }

        // NOTE: Previously we stripped BatchNumbers/SerialNumbers/DocumentLinesBinAllocations
        // for SQ-linked lines (BaseType 23), expecting SAP to use OSBS tally data.
        // However, SAP requires batch data on the invoice lines for proper processing.
        // With the deduplication fixes in place, the batch data is now clean and correct,
        // so we keep it on the invoice lines.

        let invoiceResponse;
        try {
          console.time("2.4 [BACKEND] SAP API: serviceLayerHelper.createInvoice");
          invoiceResponse = await serviceLayerHelper.createInvoice(request, cookie);
          console.timeEnd("2.4 [BACKEND] SAP API: serviceLayerHelper.createInvoice");
        } catch (error) {
          if (error?.response?.status === 401) {
            console.log("*** 401 Unauthorized from SL (Invoice) - Invalidating cache and retrying...");
            invalidateSLCache();
            cookie = await getSLConnection(req);
            console.time("2.4 [BACKEND] SAP API: serviceLayerHelper.createInvoice (Retry)");
            invoiceResponse = await serviceLayerHelper.createInvoice(request, cookie);
            console.timeEnd("2.4 [BACKEND] SAP API: serviceLayerHelper.createInvoice (Retry)");
          } else {
            console.timeEnd("2. [BACKEND] Total Invoice Create API Duration");
            throw error;
          }
        }

        // Create Incoming Payment when a payment is done via Card or CC. Skip this when an Invoice is created 
        // based on a Credit Purchase
        if (invoiceResponse.DocEntry) {
          if (req.file) {
            console.log(`[BACKEND] Attachment found for Invoice ${invoiceResponse.DocEntry}. Creating entry...`);
            const absEntry = await serviceLayerHelper.createAttachmentEntry(req, cookie);
            if (absEntry) {
              console.log(`[BACKEND] Attachment Entry ${absEntry} created. Linking to Invoice...`);
              // Link to Invoice
              const linkInvoice = await serviceLayerHelper.linkAttachmentToDocument(portalModules.INVOICE, invoiceResponse.DocEntry, absEntry, cookie);
              console.log(`[BACKEND] Invoice ${invoiceResponse.DocEntry} link result: ${linkInvoice}`);

              // We'll link to Incoming Payment after it's created, outside this block if needed, 
              // but we need absEntry. Let's keep it in scope.
              req.absEntry = absEntry;
            } else {
              console.warn(`[BACKEND] Failed to create attachment entry for Invoice ${invoiceResponse.DocEntry}`);
            }
          }
          response.DocNum = invoiceResponse.DocNum;
          response.DocEntry = invoiceResponse.DocEntry;
          response.isExist = false;

          if (req.body.incomingPayment) {
            if (ipSeriesResponse) {
              console.log("ipSeriesResponse series:", ipSeriesResponse.Series)
              req.body.incomingPayment.Series = ipSeriesResponse.Series;
            }
            console.time("2.6 [BACKEND] processPayment");
            const ipResponse = await processPayment(invoiceResponse.DocEntry, req.body.incomingPayment, cookie, req.absEntry);
            console.timeEnd("2.6 [BACKEND] processPayment");
            if (ipResponse) {
              response.IncomingPaymentDocNum = ipResponse.DocNum;
              ipDocEntry = ipResponse.DocEntry;

              if (req.absEntry) {
                console.log(`[BACKEND] Linking attachment ${req.absEntry} to Incoming Payment DocEntry ${ipDocEntry} via robust method...`);
                // Using the new helper for robust linking
                const linkRes = await serviceLayerIPHelper.updatePaymentAttachment(req, ipDocEntry, cookie);
                console.log(`[BACKEND] Attachment linking result for Payment ${ipDocEntry}: ${JSON.stringify(linkRes)}`);
              }

              if (req.body?.journalEntry) {
                console.time("2.7 [BACKEND] processJournalEntry");
                const journalResponse = await processJournalEntry(
                  req.body.journalEntry, invoiceResponse.DocNum, ipResponse.DocNum, cookie);
                console.timeEnd("2.7 [BACKEND] processJournalEntry");
                response.JournalEntryDocNum = journalResponse?.JdtNum;
              }
            }
          }

          if (enableFircaIntegration) {
            // FIRCA Integration (Await for QR Code)
            console.time("2.8 [BACKEND] FIRCA Integration");
            try {
              const isInvoiceSubmitted = await submitInvoicetoFirca(invoiceResponse.DocEntry, companyCode, "Invoice");
              if (isInvoiceSubmitted) {
                const qrCodeDataURI = await getFircaQRCodeDataURI(invoiceResponse.DocNum);
                if (qrCodeDataURI) {
                  response.qrCode = qrCodeDataURI;
                  console.log("FIRCA qrCodeDataURI computed successfully.");
                }
              }
            } catch (err) {
              console.error("FIRCA error:", err);
            }
            console.timeEnd("2.8 [BACKEND] FIRCA Integration");
          }

          // Fetch UDF Data (SDC details)
          console.time("2.9 [BACKEND] getUDFData");
          try {
            let responseUDFData = await getUDFData(invoiceResponse.DocNum);

            // SDC Integration might take a brief moment to update SAP UDFs.
            // If details are missing, we wait and retry (limited to once).
            if ((!responseUDFData || !responseUDFData.U_SDCInvNum) && enableFircaIntegration) {
              console.log("SDC Details not yet available, waiting 3 seconds before retry...");
              await new Promise(resolve => setTimeout(resolve, 3000));
              responseUDFData = await getUDFData(invoiceResponse.DocNum);
            }

            if (responseUDFData) {
              console.log("UDF Data fetched successfully. Inv:", responseUDFData.U_InvCount);
              response.InvCount = responseUDFData.U_InvCount;
              response.SDCTime = responseUDFData.U_SDCTime;
              response.SDCInvNum = responseUDFData.U_SDCInvNum;
              response.VehicleNo = responseUDFData.U_VehicleNo;
              response.TradeNum = responseUDFData.U_TINNO;
            }
          } catch (err) {
            console.error("UDF Error:", err);
          }
          console.timeEnd("2.9 [BACKEND] getUDFData");
        }
      } else {
        console.log("uniqueResponse unique:", uniqueResponse?.DocNum)
        response.DocNum = uniqueResponse.DocNum;
        response.DocEntry = uniqueResponse.DocEntry;
        response.isExist = true;
      }
      console.log("*************invoiceSalesBatchResponse start************ ")
      if (req.body.salesBatchSelection.length > 0) {
        console.time("2.10 [BACKEND] createSalesBatchSelection");
        const responseSBS = await createSalesBatchSelection(response.DocEntry, response.DocNum, req.body.salesBatchSelection, cookie);
        console.timeEnd("2.10 [BACKEND] createSalesBatchSelection");
        console.log("*************invoiceSalesBatchResponse************: ", responseSBS)
        // if(responseSBS) {
        //   const response = dbHelper.executeBatchInsertUpdate(query.updateInvoiceItem, updateRequest);
        // }
      }
      console.log("*************invoiceSalesBatchResponse end************ ")
      if (req.body.invoice.U_PaymentType === "Card") {
        console.log("*************CreditCard Management referenece start************ ")
        if (req.body.incomingPayment?.TransferReference && req.body.incomingPayment?.TransferReference !== "") {
          console.log("*************CreditCard Management referenece************: ", ipDocEntry + " - " + req.body.incomingPayment.TransferReference)
          const responseTransRef = await updateTransRef(ipDocEntry, req.body.incomingPayment?.TransferReference);
          console.log("*************CreditCard Management referenece************: ", responseTransRef)
        }
        console.log("*************CreditCard Management referenece end************ ")
      }
      if (response.DocNum) {
        const itemDetails = getItemDetails({ docNum: response.DocNum });
        response.itemList = itemDetails;
      }
      if (response.DocEntry) {
        const timItems = getTimberItemDetails(response.DocEntry);
        response.timItemList = timItems;
      }
      if (req.absEntry) {
        console.log(`[BACKEND] Adding AbsoluteEntry ${req.absEntry} to final API response.`);
        response.AttachmentEntry = req.absEntry;
      }
      console.timeEnd("2. [BACKEND] Total Invoice Create API Duration");
      res.status(200).send(response);
    }
    else {
      res.status(400).send({ message: "Invalid Request. Missing 'invoice' property!" });
    }
  }
  catch (error) {
    console.log("create Invoice: ", error?.response?.data || error.message);
    next(error);
  }
  finally {
    if (uniqueID) {
      activeInvoiceRequests.delete(uniqueID); // Here we delete the active invoice request from the map
    }
  }
}

/**
 * Create Incoming Payment
 * @param {*} invoiceDocEntry Invoice DocEntry
 * @param {*} ipRequest   IP request
 * @param {*} cookie
 * 
 * @returns Incoming Payment response
 */
const processPayment = async (invoiceDocEntry, ipRequest, cookie, absEntry) => {
  try {
    ipRequest.PaymentInvoices[0].DocEntry = invoiceDocEntry;
    // We remove the direct AttachmentEntry assignment here because we'll use 
    // updatePaymentAttachment (Attachments2_Lines) after creation instead.
    // if (absEntry) {
    //   ipRequest.AttachmentEntry = absEntry;
    // }
    if (Array.isArray(ipRequest.PaymentChecks) && ipRequest.PaymentChecks.length > 0) {
      ipRequest.PaymentChecks[0].DueDate = formatDate(new Date(), "YYYY-MM-DD HH24:MI:SS.FF2");
    }
    const ipResponse = await serviceLayerIPHelper.createIncomingPayment(ipRequest, cookie);
    return ipResponse;
  }
  catch (err) {
    throw err;
  }
}

/**
 * Create Journal Entry
 * @param {*} request       Journal Entry request
 * @param {*} invoiceDocNum Invoice DocNum
 * @param {*} ipDocNum Incoming Payment DocNum
 * @param {*} cookie
 * 
 * @returns Journal Entry response
 */
const processJournalEntry = async (request, invoiceDocNum, ipDocNum, cookie) => {
  const today = formatDate(new Date(), "YYYY-MM-DD HH24:MI:SS.FF2");

  try {
    request.Reference = invoiceDocNum;
    request.Reference2 = ipDocNum;
    request.TaxDate = today;
    request.DueDate = today;
    request.ReferenceDate = today;

    const jeResponse = await serviceLayerJEHelper.createJournalEntry(request, cookie);
    return jeResponse;
  }
  catch (err) {
    throw err;
  }
}

const createSalesBatchSelection = async (invoiceDocEntry, invoiceDocNum, sbsRequest, cookie) => {
  try {
    let docNum = [];
    //const cookie = await getSLConnection(req);
    console.log("********* createSalesBatchSelection ****request: ", sbsRequest)
    const response = await serviceLayerSBSHelper.createSalesBatchSelection(sbsRequest, invoiceDocEntry, invoiceDocNum, cookie);
    //console.log("*************invoiceResponse************: ", invoiceResponse)
    if (response.length > 0) {
      response.forEach(async (item) => {
        const updateSalesBatchSelectionResponse = await updateSalesBatchSelection(item, invoiceDocEntry)
      });
      docNum.push(response.DocNum);
    }
    return docNum;
  }
  catch (error) {
    console.log("create Invoice: ", error?.response?.data || error.message);
    throw error;
  }
}

const update = async (req, res, next) => {
  try {
    if (req.body) {
      if (typeof req.body.request === 'string') {
        const parsedRequest = JSON.parse(req.body.request);
        Object.assign(req.body, parsedRequest);
      }
      let response = {};
      const cookie = await getSLConnection(req);
      let generateDeliveryCode;

      const request = req.body;
      request.U_DeliveryStatus = request.U_DeliveryStatus || "DELIVERED";
      request.U_IsPaymentReceived = request.U_IsPaymentReceived || "Y";

      console.log("*************request: ", request)
      const invoiceResponse = await serviceLayerHelper.updateInvoice(request, cookie);
      //console.log("*************invoiceResponse************: ", invoiceResponse)
      if (!invoiceResponse || invoiceResponse.status === 200 || invoiceResponse.DocEntry) {
        response.DocNum = request.DocNum;
        response.DocEntry = request.DocEntry
        response.message = invoiceResponse.message;
        const attachRes = await updateAttach(req, request.DocEntry, cookie);
        if (attachRes) {
          console.log("Attachment updated")
        }
      }
      res.status(200).send(response);
    }
    else {
      res.status(400).send({ message: "Invalid Request. Missing 'invoice' property!" });
    }
  }
  catch (error) {
    console.log("create Invoice: ", error?.response?.data || error.message);
    next(error);
  }
}

//const updateAttach = async (req, res, next) => {
const updateAttach = async (req, docEntry, cookie) => {
  try {
    if (!req.file) return null;

    // Create or find attachment entry
    const absEntry = await serviceLayerHelper.createAttachmentEntry(req, cookie);
    if (absEntry) {
      // Link to Invoice
      return await serviceLayerHelper.linkAttachmentToDocument(portalModules.INVOICE, docEntry, absEntry, cookie);
    }
    return null;
  }
  catch (error) {
    console.log("updateAttach error: ", error?.response?.data || error.message);
  }
}

module.exports = { create, update, updateAttach };
