const { getSLConnection } = require("../helper/service-layer-login.js");
const serviceLayerHelper = require("../helper/service-layer-credit-memo-request.js");
const invoiceHelper = require("../helper/invoice.js");
const creditMemoHelper = require("../helper/credit-memo.js");

const activeReturnsRequests = new Map();

const create = async (req, res, next) => {
  let wasReopened = false;
  let useNativeMapping = true;
  let baseInvoiceEntry = null;
  let cookie = null;
  let baseInvoiceAttachmentEntry = null;
  let invoiceAttachmentTemporarilyRemoved = false;
  let uniqueID = null;

  try {
    // 🔹 1. Parse Data
    const salesReturnData = JSON.parse(req.body.salesReturnData);
    let creditMemoRequest = salesReturnData[0] || {};
    let invoiceUpdateRequest = salesReturnData[1] || [];

    uniqueID = creditMemoRequest.Unique;

    // 🔹 1a. In-Memory Debouncing (Locking)
    if (uniqueID) {
      if (activeReturnsRequests.has(uniqueID)) {
        console.error(`[BACKEND] Concurrent request detected for Return UniqueID: ${uniqueID}. Blocking.`);
        return res.status(409).send({ message: "Transaction already processing. Please wait." });
      }
      activeReturnsRequests.set(uniqueID, true);
    }

    // 🔹 1b. Duplicate Check (Database)
    if (uniqueID) {
      console.log(`[Duplicate Check] Checking for existing return with Unique ID: ${uniqueID}`);
      const duplicateRecord = await creditMemoHelper.getUniqueId(uniqueID);
      if (duplicateRecord) {
        console.log(`[Duplicate Check] Duplicate found! Returning existing DocNum: ${duplicateRecord.DocNum}`);
        return res.status(200).send({
          DocNum: duplicateRecord.DocNum,
          DocEntry: duplicateRecord.DocEntry,
          isExist: true
        });
      }
    }

    const attachmentFile = req.file;

    // 🔹 2. Login
    cookie = await getSLConnection(req);
    if (!cookie) throw new Error("Session Login Failed");

    // 🔹 3. Identify Base Invoice
    baseInvoiceEntry = invoiceUpdateRequest?.[0]?.DocEntry;
    if (!baseInvoiceEntry) throw new Error("Base Invoice DocEntry is missing");

    // 🔹 4. Status Check & Defensive Reopen
    const invoiceData = await invoiceHelper.getInvoiceByDocEntry(baseInvoiceEntry, req);
    if (invoiceData?.DocumentStatus === "bost_Close" || invoiceData?.DocumentStatus === "C") {
      try {
        console.log(`[Status] Invoice ${baseInvoiceEntry} is closed. Attempting Reopen...`);
        await serviceLayerHelper.reopenInvoice(cookie, baseInvoiceEntry);
        console.log(`[Status] Reopen successful for ${baseInvoiceEntry}`);
        wasReopened = true;
      } catch (reopenErr) {
        const errMsg = reopenErr.response?.data?.error?.message?.value || reopenErr.message;
        if (errMsg.toLowerCase().includes("not supported") || errMsg.includes("404") || reopenErr.response?.status === 404) {
          console.warn(`[Fallback] SAP version does not support 'Reopen'. Falling back to Standalone mapping.`);
          useNativeMapping = false;
        } else {
          throw new Error(`Failed to reopen invoice: ${errMsg}`);
        }
      }
    }

    // 🔹 4a. Attachment Strategy — Temporary Detach to preserve native document linking.
    baseInvoiceAttachmentEntry = invoiceData?.AttachmentEntry || null;
    if (baseInvoiceAttachmentEntry && useNativeMapping) {
      try {
        console.log(`[Attachment] Invoice ${baseInvoiceEntry} has AttachmentEntry: ${baseInvoiceAttachmentEntry}. Temporarily clearing to prevent [131-102] folder error...`);
        await serviceLayerHelper.patchInvoice(baseInvoiceEntry, { AttachmentEntry: null }, cookie);
        invoiceAttachmentTemporarilyRemoved = true;
        console.log(`[Attachment] Invoice attachment cleared. Native mapping ACTIVE — document link will be preserved.`);
      } catch (patchErr) {
        const patchErrMsg = patchErr.response?.data?.error?.message?.value || patchErr.message;
        console.warn(`[Attachment Fallback] Could not temporarily clear invoice attachment (${patchErrMsg}). Falling back to Standalone mapping.`);
        useNativeMapping = false;
      }
    }

    // 🔹 5. Map Lines
    creditMemoRequest.DocumentLines = creditMemoRequest.DocumentLines.map((line, index) => {
      const original = invoiceUpdateRequest[index];
      const mappedLine = {
        Quantity: Number(line.Quantity),
      };

      // Native mode: full base-document reference for SAP document chain & Contents tab
      if (useNativeMapping) {
        mappedLine.BaseType = 13;
        mappedLine.BaseEntry = Number(baseInvoiceEntry);
        mappedLine.BaseLine = original ? Number(original.LineNum) : index;
      }

      return mappedLine;
    });

    console.log(`DEBUG: Mapping Mode: ${useNativeMapping ? 'NATIVE (linked)' : 'STANDALONE (unlinked)'}`);
    console.log("DEBUG: Mapped DocumentLines:", JSON.stringify(creditMemoRequest.DocumentLines, null, 2));

    // 🔹 6. Create the Return Document
    let response = await serviceLayerHelper.createCreditMemoRequest(creditMemoRequest, cookie);
    console.log(`[Return] Created Return DocNum: ${response.DocNum}, DocEntry: ${response.DocEntry}`);

    // 🔹 7. Restore & Link Attachments (Post-Creation)
    if (invoiceAttachmentTemporarilyRemoved && baseInvoiceAttachmentEntry) {
      try {
        await serviceLayerHelper.patchInvoice(baseInvoiceEntry, { AttachmentEntry: baseInvoiceAttachmentEntry }, cookie);
        console.log(`[Attachment] Restored AttachmentEntry (${baseInvoiceAttachmentEntry}) to Invoice ${baseInvoiceEntry}`);
      } catch (restoreErr) {
        console.warn(`[Attachment Warning] Failed to restore invoice's AttachmentEntry:`, restoreErr.response?.data || restoreErr.message);
      }
    }

    if (baseInvoiceAttachmentEntry) {
      try {
        await serviceLayerHelper.patchCreditMemoRequest(response.DocEntry, { AttachmentEntry: baseInvoiceAttachmentEntry }, cookie);
        console.log(`[Attachment] Linked base invoice AttachmentEntry (${baseInvoiceAttachmentEntry}) to Return ${response.DocEntry}`);
      } catch (linkErr) {
        console.warn(`[Attachment Warning] Failed to link invoice attachment to return:`, linkErr.response?.data || linkErr.message);
      }
    }

    if (attachmentFile) {
      const attachmentEntry = await serviceLayerHelper.createAttachment(attachmentFile, cookie);
      if (attachmentEntry) {
        try {
          await serviceLayerHelper.patchCreditMemoRequest(response.DocEntry, { AttachmentEntry: attachmentEntry }, cookie);
          console.log(`[Attachment] POS file attachment (${attachmentEntry}) linked to Return ${response.DocEntry}`);
        } catch (patchErr) {
          console.warn(`[Attachment Warning] Failed to link POS attachment to Return:`, patchErr.response?.data || patchErr.message);
        }
      }
    }

    // 🔹 8. Restore Invoice Status (if we reopened it)
    if (wasReopened) {
      try {
        console.log(`[Status] Restoring Invoice ${baseInvoiceEntry} to closed.`);
        await serviceLayerHelper.closeInvoice(cookie, baseInvoiceEntry);
      } catch (closeErr) {
        console.warn("[Status Warning] Failed to re-close invoice, but return was posted.");
      }
    }

    // 🔹 9. Update Local Quantities (POS sync)
    if (invoiceUpdateRequest.length > 0) {
      try {
        await invoiceHelper.updateRemainingQuantity(invoiceUpdateRequest);
      } catch (localErr) {
        console.warn("[Sync Warning] Failed to update local invoice quantities, but Return was posted in SAP: ", localErr.message);
      }
    }

    res.status(200).send({ DocNum: response.DocNum, DocEntry: response.DocEntry });

  } catch (error) {
    const msg = error.response?.data?.error?.message?.value || error.message;
    console.error("!!! FINAL ERROR !!!: " + msg);

    // Cleanup: Restore invoice AttachmentEntry
    if (invoiceAttachmentTemporarilyRemoved && baseInvoiceEntry && cookie && baseInvoiceAttachmentEntry) {
      try {
        await serviceLayerHelper.patchInvoice(baseInvoiceEntry, { AttachmentEntry: baseInvoiceAttachmentEntry }, cookie);
        console.log(`[Cleanup] Restored invoice AttachmentEntry after error.`);
      } catch (e) {
        console.warn(`[Cleanup Warning] Could not restore invoice AttachmentEntry:`, e.message);
      }
    }

    // Cleanup: Re-close the invoice
    if (wasReopened && baseInvoiceEntry && cookie) {
      try { await serviceLayerHelper.closeInvoice(cookie, baseInvoiceEntry); } catch (e) { }
    }

    res.status(500).json({ message: msg });
  } finally {
    if (uniqueID) {
      activeReturnsRequests.delete(uniqueID);
    }
  }
};

module.exports = { create };
