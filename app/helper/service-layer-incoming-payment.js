const { serviceLayerAPI } = require("../config/service-layer-api.js");
const { portalModules, serviceLayerApiURIs } = require("../config/config.js");

const moduleName = portalModules.INCOMING_PAYMENT;
const serviceLayerURI = serviceLayerApiURIs[moduleName];

exports.createIncomingPayment = async (request, cookie) => {
  try {
    request.DocObjectCode = "bopot_IncomingPayments";
    console.log("*** IncomingPayment request: " + JSON.stringify(request));
    console.log("*** [DEBUG] IncomingPayment final request payload: " + JSON.stringify(request));
    serviceLayerAPI.defaults.headers.Cookie = cookie;
    const response = await serviceLayerAPI.post(serviceLayerURI, request);
    console.log(`Create IncomingPayment response: ${JSON.stringify(response.data)}`);

    if (response.data) {
      return response.data;
    }
    return;
  }
  catch (error) {
    console.log("Create IncomingPayment error: " + error);
    throw error;
  }
}

exports.updatePaymentAttachment = async (request, docEntry, cookie) => {
  try {
    console.log("*** IncomingPayment Attachment request: start ");
    if (!request.file) {
      console.warn("*** Unexpected response status:", "No file uploaded");
      return { message: "Payment Attachment: No file uploaded!", status: 200, success: false };
    }

    const serviceLayerInvoiceHelper = require("./service-layer-invoice");
    const absEntry = await serviceLayerInvoiceHelper.createAttachmentEntry(request, cookie);

    if (absEntry) {
      const payload = {
        "Attachments2_Lines": [{
          "FileName": require('path').basename(request.file.originalname, require('path').extname(request.file.originalname)),
          "FileExtension": require('path').extname(request.file.originalname).replace(".", ""),
          "SourcePath": require("../config/config").attachmentPath.replace(/\\/g, "/")
        }]
      };

      serviceLayerAPI.defaults.headers.Cookie = cookie;
      const response = await serviceLayerAPI.patch(`${serviceLayerURI}(${docEntry})`, payload);

      if (response.status === 204) {
        console.log("*** IncomingPayment Attachment linked successfully.");
        return { message: "Payment Attachment updated successfully.", status: 200, absEntry };
      }
    }
    return { message: "Failed to link attachment", status: 500 };
  }
  catch (error) {
    console.error("Payment Attachment upload error:", error.response?.data || error.message);
    throw error;
  }
}
