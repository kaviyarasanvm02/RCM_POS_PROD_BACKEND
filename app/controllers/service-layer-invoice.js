const { getSLConnection } = require("../helper/service-layer-login.js");
const serviceLayerHelper = require("../helper/service-layer-invoice.js");
const dbHelper = require("../helper/db.js");
const voucherHelper = require("../helper/voucher.js");
const { dbCreds } = require("../config/hana-db.js");
const serviceLayerIPHelper = require("../helper/service-layer-incoming-payment.js");
const serviceLayerSBSHelper = require("../helper/service-layer-sales-batch-selection.js");
const serviceLayerJEHelper = require("../helper/service-layer-journal-entry.js");
const cashDenominationService = require("../entities/services/cash-denominations.service.js");
const { formatDate } = require("../utils/utils.js");
const {
  trxTypes,
  defaultBranchId,
  fircaIntegrationWaitTime,
  enableFircaIntegration,
  objectCodes,
  portalModules,
  enableStoreBasedNumbering,
  isHomeDeliveryEnabled,
} = require("../config/config.js");
const { submitInvoicetoFirca } = require("../helper/invoice-to-firca.js");
const {
  getFircaQRCodeDataURI,
  getUDFData,
  updateSalesBatchSelection,
  updateTransRef,
  getUniqueId,
  updateMfgSerialNumber,
} = require("../helper/invoice.js");
const { getNumberingSeries } = require("../helper/numbering-series.js");
const {
  getItemDetails,
  getTimberItemDetails,
} = require("../helper/invoice.js");

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
      // Use U_POS_TransactionID as the lock key (this is what the AJAX frontend sends).
      // Fall back to Unique (used by RCM frontend) for compatibility.
      uniqueID = req.body.invoice.U_POS_TransactionID || req.body.invoice.Unique || req.body.invoice.U_Unique;
      if (uniqueID) {
        if (activeInvoiceRequests.has(uniqueID)) {
          console.error(`[BACKEND] Concurrent request detected for TransactionID: ${uniqueID}. Blocking.`);
          return res.status(409).send({ message: "Transaction already processing. Please wait." });
        }
        activeInvoiceRequests.set(uniqueID, true);
      }

      let response = {};
      let ipDocEntry = "";
      let uniqueData = {};

      const request = req.body.invoice;
      const companyCode = request.CompanyCode ? request.CompanyCode : "";

      // --- VOUCHER VALIDATION GATE ---
      if (
        req.body.incomingPayment?.PaymentCreditCards &&
        Array.isArray(req.body.incomingPayment.PaymentCreditCards)
      ) {
        for (const card of req.body.incomingPayment.PaymentCreditCards) {
          const isVoucher =
            String(card.CreditCard).toUpperCase() === "VOUCHER" ||
            card.CreditCard === 16 ||
            (req.body.invoice?.U_PaymentType || "")
              .toUpperCase()
              .includes("VOUCHER") ||
            voucherHelper.isVoucherCard(card.CreditCard);

          if (isVoucher && card.VoucherNum) {
            const voucherNum = card.VoucherNum.trim();
            console.log(
              `[BACKEND] Validating voucher ${voucherNum} before creating invoice`
            );
            const voucher = voucherHelper.getVoucherBySerial(voucherNum);

            if (!voucher) {
              return res.status(400).send({
                success: false,
                code: "VOUCHER_NOT_FOUND",
                message: `Invalid voucher number: ${voucherNum}`,
              });
            }

            if (voucher.U_Redeemed === "Y") {
              return res.status(400).send({
                success: false,
                code: "VOUCHER_ALREADY_REDEEMED",
                message: `This voucher (${voucherNum}) has already been redeemed.`,
              });
            }

            if (String(voucher.Status) === "1") {
              return res.status(400).send({
                success: false,
                code: "VOUCHER_NOT_AVAILABLE",
                message: `Voucher ${voucherNum} is unavailable or already redeemed.`,
              });
            }

            // Date validations (InDate / ExpDate)
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (voucher.InDate) {
              const inDate = new Date(voucher.InDate);
              inDate.setHours(0, 0, 0, 0);
              if (today < inDate) {
                return res.status(400).send({
                  success: false,
                  code: "VOUCHER_NOT_ACTIVE",
                  message: `This voucher (${voucherNum}) is not active yet. It will be active on ${formatDate(inDate, "DD/MM/YYYY")}.`,
                });
              }
            }

            if (voucher.ExpDate) {
              const expDate = new Date(voucher.ExpDate);
              expDate.setHours(23, 59, 59, 999);
              if (today > expDate) {
                return res.status(400).send({
                  success: false,
                  code: "VOUCHER_EXPIRED",
                  message: `This voucher (${voucherNum}) expired on ${formatDate(expDate, "DD/MM/YYYY")}.`,
                });
              }
            }

            const voucherValue = Number(voucher.U_VoucherValue || 0);
            const voucherCents = Math.round(voucherValue * 100);
            const creditSum = Number(card.CreditSum || 0);
            const creditCents = Math.round(creditSum * 100);

            if (creditCents > voucherCents) {
              return res.status(400).send({
                success: false,
                code: "VOUCHER_AMOUNT_EXCEEDED",
                message: `Payment amount ($${creditSum.toFixed(
                  2
                )}) exceeds voucher value ($${voucherValue.toFixed(2)}).`,
              });
            }
          }
        }
      }

      const cookie = await getSLConnection(req);
      let generateDeliveryCode;

      if (isHomeDeliveryEnabled && request.U_IsHomeDelivery === "Y") {
        generateDeliveryCode = Math.floor(100000 + Math.random() * 900000);
        request.U_DeliveryCode = generateDeliveryCode;
      }

      if (enableStoreBasedNumbering) {
        // Get Numbering Series.
        let seriesResponse = await getNumberingSeries(
          objectCodes[portalModules.INVOICE],
          req.session.userSessionLog.storeLocation
        );
        if (seriesResponse) {
          console.log("seriesResponse series:", seriesResponse.Series);
          request.Series = seriesResponse.Series;
        }
      }

      // Update ManufacturerSerialNumber & Voucher Validity (InDate=tomorrow, ExpDate=1 year from tomorrow) in SAP OSRN/OSRI BEFORE posting invoice
      if (Array.isArray(request.DocumentLines)) {
        for (const line of request.DocumentLines) {
          if (Array.isArray(line.SerialNumbers)) {
            for (const serial of line.SerialNumbers) {
              if (serial.InternalSerialNumber && serial.ManufacturerSerialNumber) {
                try {
                  updateMfgSerialNumber(
                    line.ItemCode,
                    serial.InternalSerialNumber,
                    serial.ManufacturerSerialNumber
                  );
                } catch (mfgErr) {
                  console.error("[BACKEND] Error updating ManufacturerSerialNumber in OSRN:", mfgErr.message);
                }
              }

              const serialNo = serial.InternalSerialNumber || serial.ManufacturerSerialNumber;
              if (serialNo && voucherHelper.isGiftVoucher(line.ItemCode, serialNo)) {
                try {
                  const postingDate = request.DocDate || new Date();
                  voucherHelper.updateVoucherValidityDates(line.ItemCode, serialNo, postingDate);
                } catch (vErr) {
                  console.error("[BACKEND] Error updating voucher validity dates:", vErr.message);
                }
              }
            }
          }
        }
      }

      console.log("PAYLOAD_TO_SAP:", JSON.stringify(request, null, 2));
      const invoiceResponse = await serviceLayerHelper.createInvoice(
        request,
        cookie
      );

      if (invoiceResponse.isExist) {
        response.DocNum = invoiceResponse.DocNum;
        response.DocEntry = invoiceResponse.DocEntry;
        response.isExist = true;

        try {
          const timeQuery = `SELECT TOP 1 "CreateDate", "CreateTS", "DocTime", "DocDate" FROM ${dbCreds.CompanyDB}.OINV WHERE "DocEntry" = ?`;
          let dbRes = dbHelper.executeWithValues(timeQuery, [invoiceResponse.DocEntry]);
          if (dbRes && dbRes.length > 0) {
            response.DocDate = dbRes[0].DocDate || invoiceResponse.DocDate;
            response.CreateDate = dbRes[0].CreateDate;
            response.CreateTS = dbRes[0].CreateTS;
            response.DocTime = dbRes[0].DocTime;
          }
        } catch (e) {
          console.error("Failed fetching precise time for duplicate", e.message);
        }

        const responseUDFData = await getUDFData(invoiceResponse.DocNum);
        if (responseUDFData) {
          response.InvCount = responseUDFData.U_InvCount;
          response.SDCTime = responseUDFData.U_SDCTime;
          response.SDCInvNum = responseUDFData.U_SDCInvNum;
          response.VehicleNo = responseUDFData.U_VehicleNo;
        }

        const itemDetails = await getItemDetails({ docNum: response.DocNum });
        response.itemList = itemDetails;

        return res.status(200).send(response);
      }

      // Create Incoming Payment when a payment is done via Card or CC. 
      if (invoiceResponse.DocEntry) {
        response.DocNum = invoiceResponse.DocNum;
        response.DocEntry = invoiceResponse.DocEntry;

        const hasQuotationBase = request.DocumentLines?.some(line => line.BaseType === 23 || line.BaseType === '23');
        if (hasQuotationBase && request.DocDueDate) {
          console.log(`[BACKEND] Invoice ${invoiceResponse.DocEntry} created from Quotation. Overriding DocDueDate to ${request.DocDueDate} to match invoice expiry period.`);
          try {
            await serviceLayerHelper.updateInvoice({
              DocEntry: invoiceResponse.DocEntry,
              DocDueDate: request.DocDueDate
            }, cookie);
            console.log(`[BACKEND] Successfully updated DocDueDate for Invoice ${invoiceResponse.DocEntry}`);
          } catch (updateErr) {
            console.error(`[BACKEND] Failed to update DocDueDate for Invoice ${invoiceResponse.DocEntry}:`, updateErr.message);
          }
        }

        try {
          const timeQuery = `SELECT TOP 1 "CreateDate", "CreateTS", "DocTime" FROM ${dbCreds.CompanyDB}.OINV WHERE "DocEntry" = ?`;
          let dbRes = dbHelper.executeWithValues(timeQuery, [invoiceResponse.DocEntry]);
          if (dbRes && dbRes.length > 0) {
            response.DocDate = invoiceResponse.DocDate;
            response.CreateDate = dbRes[0].CreateDate;
            response.CreateTS = dbRes[0].CreateTS;
            response.DocTime = dbRes[0].DocTime;
          } else {
            response.DocDate = invoiceResponse.DocDate;
            response.CreateDate = invoiceResponse.CreationDate;
            response.CreateTS = invoiceResponse.CreationTime;
            response.DocTime = invoiceResponse.DocTime;
          }
        } catch (e) {
          console.error("Failed fetching precise time", e.message);
          response.DocDate = invoiceResponse.DocDate;
          response.CreateDate = invoiceResponse.CreationDate;
          response.CreateTS = invoiceResponse.CreationTime;
          response.DocTime = invoiceResponse.DocTime;
        }

        response.isExist = false;

        if (req.body.incomingPayment) {
          if (enableStoreBasedNumbering) {
            // Get Numbering Series for Incoming Payment.
            let seriesResponse = await getNumberingSeries(
              objectCodes[portalModules.INCOMING_PAYMENT],
              req.session.userSessionLog.storeLocation
            );
            if (seriesResponse) {
              console.log("seriesResponse series:", seriesResponse.Series);
              req.body.incomingPayment.Series = seriesResponse.Series;
            }
          }
          const ipResponse = await processPayment(
            invoiceResponse.DocEntry,
            req.body.incomingPayment,
            cookie
          );
          if (ipResponse) {
            response.IncomingPaymentDocNum = ipResponse.DocNum;
            ipDocEntry = ipResponse.DocEntry;

            if (req.body?.journalEntry) {
              const journalResponse = await processJournalEntry(
                req.body.journalEntry,
                invoiceResponse.DocNum,
                ipResponse.DocNum,
                cookie
              );
              response.JournalEntryDocNum = journalResponse?.JdtNum;
            }
          }
        }

        // --- FIRCA INTEGRATION START ---
        if (enableFircaIntegration) {
          // Submit the invoice to firca.
          let isInvoiceSubmitted = await submitInvoicetoFirca(
            invoiceResponse.DocEntry,
            companyCode,
            "Invoice"
          );
          if (isInvoiceSubmitted) {
            const qrCodeDataURI = await getFircaQRCodeDataURI(
              invoiceResponse.DocNum
            );
            console.log("qrCodeDataURI", qrCodeDataURI);
            response.qrCode = qrCodeDataURI;
          }
        }
        // --- FIRCA INTEGRATION END ---

        const responseUDFData = await getUDFData(invoiceResponse.DocNum);
        if (responseUDFData) {
          response.InvCount = responseUDFData.U_InvCount;
          response.SDCTime = responseUDFData.U_SDCTime;
          response.SDCInvNum = responseUDFData.U_SDCInvNum;
          response.VehicleNo = responseUDFData.U_VehicleNo;
        }
      }

      console.log("*************invoiceSalesBatchResponse start************ ");
      if (req.body.salesBatchSelection && req.body.salesBatchSelection.length > 0) {
        const responseSBS = await createSalesBatchSelection(
          response.DocEntry,
          response.DocNum,
          req.body.salesBatchSelection,
          cookie
        );
        console.log(
          "*************invoiceSalesBatchResponse************: ",
          responseSBS
        );
      }
      console.log("*************invoiceSalesBatchResponse end************ ");

      if (req.body.invoice.U_PaymentType === "Card") {
        console.log("*************CreditCard Management reference start************ ");
        if (
          req.body.incomingPayment?.TransferReference &&
          req.body.incomingPayment?.TransferReference !== ""
        ) {
          console.log(
            "*************CreditCard Management reference************: ",
            ipDocEntry + " - " + req.body.incomingPayment.TransferReference
          );
          const responseTransRef = await updateTransRef(
            ipDocEntry,
            req.body.incomingPayment?.TransferReference
          );
          console.log(
            "*************CreditCard Management reference************: ",
            responseTransRef
          );
        }
        console.log("*************CreditCard Management reference end************ ");
      }

      // Check and automatically redeem any vouchers used in payment
      if (
        req.body.incomingPayment?.PaymentCreditCards &&
        Array.isArray(req.body.incomingPayment.PaymentCreditCards)
      ) {
        for (const card of req.body.incomingPayment.PaymentCreditCards) {
          const isVoucher =
            String(card.CreditCard).toUpperCase() === "VOUCHER" ||
            card.CreditCard === 16 ||
            (req.body.invoice?.U_PaymentType || "")
              .toUpperCase()
              .includes("VOUCHER") ||
            voucherHelper.isVoucherCard(card.CreditCard);

          if (card.VoucherNum && isVoucher) {
            console.log(
              `[BACKEND] Auto-redeeming voucher ${card.VoucherNum} for Invoice ${response.DocNum}`
            );
            try {
              voucherHelper.redeemVoucher(card.VoucherNum);
            } catch (vErr) {
              console.error(
                `[BACKEND] Error auto-redeeming voucher ${card.VoucherNum}:`,
                vErr.message
              );
            }
          }
        }
      }

      if (response.DocNum) {
        const itemDetails = await getItemDetails({ docNum: response.DocNum });
        response.itemList = itemDetails;
      }

      res.status(200).send(response);
    } else {
      res
        .status(400)
        .send({ message: "Invalid Request. Missing 'invoice' property!" });
    }
  } catch (error) {
    console.log("create Invoice error: " + JSON.stringify(error));
    next(error);
  } finally {
    if (uniqueID) {
      activeInvoiceRequests.delete(uniqueID);
    }
  }
};

/**
 * Create Incoming Payment
 */
const processPayment = async (invoiceDocEntry, ipRequest, cookie) => {
  try {
    ipRequest.PaymentInvoices[0].DocEntry = invoiceDocEntry;
    if (
      Array.isArray(ipRequest.PaymentChecks) &&
      ipRequest.PaymentChecks.length > 0
    ) {
      const todayFormatted = formatDate(
        new Date(),
        "YYYY-MM-DD HH24:MI:SS.FF2"
      );
      ipRequest.PaymentChecks.forEach((check) => {
        check.DueDate = todayFormatted;
      });
    }
    if (
      Array.isArray(ipRequest.PaymentCreditCards) &&
      ipRequest.PaymentCreditCards.length > 0
    ) {
      ipRequest.PaymentCreditCards.forEach((card) => {
        if (typeof card.CreditCard === "string") {
          const parsed = parseInt(card.CreditCard, 10);
          card.CreditCard = !isNaN(parsed) ? parsed : 16;
        } else if (typeof card.CreditCard !== "number") {
          card.CreditCard = 16;
        }
      });
    }
    const ipResponse = await serviceLayerIPHelper.createIncomingPayment(
      ipRequest,
      cookie
    );
    return ipResponse;
  } catch (err) {
    throw err;
  }
};

/**
 * Create Journal Entry
 */
const processJournalEntry = async (
  request,
  invoiceDocNum,
  ipDocNum,
  cookie
) => {
  const today = formatDate(new Date(), "YYYY-MM-DD HH24:MI:SS.FF2");

  try {
    request.Reference = invoiceDocNum;
    request.Reference2 = ipDocNum;
    request.TaxDate = today;
    request.DueDate = today;
    request.ReferenceDate = today;

    const jeResponse = await serviceLayerJEHelper.createJournalEntry(
      request,
      cookie
    );
    return jeResponse;
  } catch (err) {
    throw err;
  }
};

const createSalesBatchSelection = async (
  invoiceDocEntry,
  invoiceDocNum,
  sbsRequest,
  cookie
) => {
  try {
    let docNum = [];
    console.log(
      "********* createSalesBatchSelection ****request: ",
      sbsRequest
    );
    const response = await serviceLayerSBSHelper.createSalesBatchSelection(
      sbsRequest,
      invoiceDocEntry,
      invoiceDocNum,
      cookie
    );

    if (response && response.length > 0) {
      for (const item of response) {
        await updateSalesBatchSelection(item, invoiceDocEntry);
      }
      docNum.push(response.DocNum);
    }
    return docNum;
  } catch (error) {
    console.log("createSalesBatchSelection error: " + JSON.stringify(error));
    throw error;
  }
};

const update = async (req, res, next) => {
  try {
    if (req.body) {
      let response = {};
      const cookie = await getSLConnection(req);

      const request = req.body;
      request.U_DeliveryStatus = request.U_DeliveryStatus || "DELIVERED";
      request.U_IsPaymentReceived = request.U_IsPaymentReceived || "Y";

      console.log("*************request update: ", request);
      const invoiceResponse = await serviceLayerHelper.updateInvoice(
        request,
        cookie
      );

      if (
        !invoiceResponse ||
        invoiceResponse.status === 200 ||
        invoiceResponse.DocEntry
      ) {
        response.DocNum = request.DocNum;
        response.DocEntry = request.DocEntry;
        response.message = invoiceResponse.message;
        const attachRes = await updateAttach(req, cookie);
        if (attachRes) {
          console.log("Attachment updated");
        }
      }
      res.status(200).send(response);
    } else {
      res
        .status(400)
        .send({ message: "Invalid Request. Missing body content!" });
    }
  } catch (error) {
    console.log("update Invoice error: " + JSON.stringify(error));
    next(error);
  }
};

const updateAttach = async (req, cookie) => {
  try {
    let attchResponse = {};
    console.log("attachment request body data: ", JSON.stringify(req.body));
    attchResponse = await serviceLayerHelper.updateInvoiceAttachment(
      req,
      cookie
    );
    console.log("attachment Response: ", attchResponse);
    return attchResponse;
  } catch (error) {
    console.log("updateAttach error: " + JSON.stringify(error));
  }
};

module.exports = { create, update, updateAttach };
