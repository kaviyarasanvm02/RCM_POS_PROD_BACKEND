const { serviceLayerAPI } = require("../config/service-layer-api");
const { portalModules, serviceLayerApiURIs } = require("../config/config");
const helper = require("../helper/credit-memo-request.js");
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const multer = require('multer');
const FormData = require('form-data');
const axios = require('axios');
const https = require('https');

const moduleName = portalModules.CREDIT_MEMO_REQUEST;
const serviceLayerURI = serviceLayerApiURIs[moduleName];
const attachServiceLayerURI = portalModules.ATTACHMENTS;

// Multer setup to handle image file upload
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

exports.createCreditMemoRequest = async (request, cookie) => {
  try {
    if (request.branchId) {
      request.BPL_IDAssignedToInvoice = request.branchId; //BranchID
      delete request.branchId;
    }

    console.log("*** CreditMemoRequest request: " + JSON.stringify(request));
    serviceLayerAPI.defaults.headers.Cookie = cookie;
    const response = await serviceLayerAPI.post(serviceLayerURI, request);
    console.log(`Create CreditMemoRequest response: ${JSON.stringify(response.data)}`);

    if(response.data) {
      return response.data;
    }
    return;
  }
  catch(error){
    console.log("Create CreditMemoRequest error: " + error);
    throw error;
  }
}

exports.patchCreditMemoRequest = async (docEntry, patchPayload, cookie) => {
  try {
    serviceLayerAPI.defaults.headers.Cookie = cookie;
    const response = await serviceLayerAPI.patch(`${serviceLayerURI}(${docEntry})`, patchPayload);
    return response.status === 204;
  } catch (error) {
    console.error(`[SAP Error] Patching CreditMemoRequest ${docEntry}:`, error.response?.data || error.message);
    throw error;
  }
};

exports.patchInvoice = async (docEntry, patchPayload, cookie) => {
  try {
    serviceLayerAPI.defaults.headers.Cookie = cookie;
    const response = await serviceLayerAPI.patch(`/Invoices(${docEntry})`, patchPayload);
    return response.status === 204;
  } catch (error) {
    console.error(`[SAP Error] Patching Invoice ${docEntry}:`, error.response?.data || error.message);
    throw error;
  }
};

exports.updateInvoiceAttachment = async (request, docEntry, cookie) => {
  try {
    console.log("*** Invoice Attachment request: start ");
    if (!request.file) {
      console.warn("*** Unexpected response status:", "No file uploaded");
      return { message: "Invoice Attachment: No file uploaded!", status: 200, success: false };
    }
    console.log("*** File details:", request.file);
    serviceLayerAPI.defaults.headers.Cookie = cookie;
    const imageBuffer = request.file.buffer;
    const originalName = request.file.originalname;

    const fileExtension = path.extname(originalName).replace(".", ""); // Remove dot from extension
    const fileName = path.basename(originalName, "." + fileExtension); // Get filename without extension
    const fullFileName = originalName; // Full filename with extension

    const attachPath = await helper.getAttachmentPath()
    const source_dir = attachPath.AttachPath;
    console.log("source_dir", source_dir);

    const fullFilePath = path.join(source_dir, originalName);
    console.log("fullFilePath: *** " + fullFilePath + " = " + imageBuffer);
    // Save the file to the source directory
    fs.writeFileSync(fullFilePath, imageBuffer);
    console.log(`*** File saved successfully at ${fullFilePath}`);

    // Attach PDF to SAP Invoice
    const att_pdf = {
      "Attachments2_Lines": [{
        "FileExtension": fileExtension,
        "SourcePath": source_dir, //source_dir.replace(/\\/g, "/"),
        "FileName": fileName
      }
      ]
    }
    let response = {};
    let absEntry;
    // Set proper headers
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    };
    console.log("att_pdf", att_pdf)
    const invoiceData = await helper.getAttachmentEntry(docEntry)
    console.log("Invoice response", JSON.stringify(invoiceData))
    if (invoiceData && invoiceData?.AtcEntry !== null) {
      absEntry = invoiceData?.AtcEntry;
      console.log("Invoice Attachment Entry: ", JSON.stringify(absEntry))
      response = await serviceLayerAPI.patch(`${attachServiceLayerURI}(${absEntry})`, att_pdf);
      if (response && response.status === 204) {
        console.log("*** Invoice Attachment updated successfully. No content in response.");
        return { message: "Invoice Attachment updated successfully.", status: 200 };
      }
    } else {
      console.log("Attachment Post API Calling");
      response = await serviceLayerAPI.post(attachServiceLayerURI, att_pdf, { headers });
      console.log("Attachment Post API Called");
      if (response.data) {
        console.log("Attachment Post Response:" + JSON.stringify(response.data));
        absEntry = response.data.AbsoluteEntry;
        const reqInvoice = {
          AttachmentEntry: absEntry
        }
        const invResponse = await serviceLayerAPI.patch(`${serviceLayerURI}(${docEntry})`, reqInvoice);

        if (invResponse && invResponse.status === 204) {
          console.log("*** Invoice Attachment and Invoice updated successfully. No content in response.");
          return { message: "Invoice Attachment and Invoice updated successfully.", status: 200 };
        }
      }
    }

    // Handle unexpected status codes
    console.warn("*** Unexpected response status:", response.status);
    return { message: "Unexpected response from server.", status: response.status };
  }
  catch (error) {
    // Log error message and stack trace
    console.error("Invoice Attachment upload error:", error.response?.data || error.message);
    console.error(error.stack);
  }
}

exports.reopenInvoice = async (cookie, docEntry) => {
  try {
    console.log(`[SAP Action] Reopening Invoice: ${docEntry}`);
    serviceLayerAPI.defaults.headers.Cookie = cookie;
    const response = await serviceLayerAPI.post(`/Invoices(${docEntry})/Reopen`);
    console.log(`[SAP Response] Reopen Success for ${docEntry}`);
    return response.data;
  } catch (error) {
    console.error(`[SAP Error] Reopening invoice ${docEntry}:`, error.response?.data || error.message);
    throw error;
  }
};

exports.closeInvoice = async (cookie, docEntry) => {
  try {
    console.log(`[SAP Action] Closing Invoice: ${docEntry}`);
    serviceLayerAPI.defaults.headers.Cookie = cookie;
    const response = await serviceLayerAPI.post(`/Invoices(${docEntry})/Close`);
    console.log(`[SAP Response] Close Success for ${docEntry}`);
    return response.data;
  } catch (error) {
    console.error(`[SAP Error] Closing invoice ${docEntry}:`, error.response?.data || error.message);
    throw error;
  }
};

exports.createAttachment = async (file, cookie) => {
  try {
    if (!file) return null;

    console.log(`*** [DEBUG] Attempting DIRECT multipart upload to SAP Attachments2: ${file.originalname}`);

    const form = new FormData();
    // SAP Service Layer is VERY specific about the multipart structure
    form.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype || 'application/octet-stream'
    });

    // Use a direct axios call to avoid default headers from serviceLayerAPI instance
    const baseUrl = process.env.SERVICE_LAYER_API_BASE_URL.replace(/[\\/]+$/, "");
    const slUrl = `${baseUrl}/Attachments2`;
    const headers = {
      ...form.getHeaders(),
      "Cookie": cookie,
      "Accept": "application/json",
      "Prefer": "odata.maxpagesize=0"
    };

    console.log(`*** [DEBUG] Uploading to SL: ${slUrl}`);

    const response = await axios.post(slUrl, form.getBuffer(), {
      headers: headers,
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    if (response.data && response.data.AbsoluteEntry) {
      console.log(`*** [SUCCESS] Attachment created directly in SAP. AbsoluteEntry: ${response.data.AbsoluteEntry}`);
      return response.data.AbsoluteEntry;
    } else {
      console.warn(`*** [WARNING] Direct attachment creation response did not contain AbsoluteEntry:`, response.data);
      return null;
    }
  } catch (error) {
    // Detailed error logging for SL "Bad post content"
    const errorData = error.response?.data || error.message;
    console.error("createAttachment (Direct Upload) error:", JSON.stringify(errorData));
    if (error?.response) {
      console.error(`*** status: ${error.response.status}`);
    }
    return null;
  }
};

module.exports.upload = upload;