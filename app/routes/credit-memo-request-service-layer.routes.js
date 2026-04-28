const express = require("express");
const controller = require("../controllers/service-layer-credit-memo-request.js");
const { portalModules, permissions } = require("../config/config.js");
const { checkUserPermission } = require("../handler/session-handler.js");

const router = new express.Router();
const serviceLayerHelper = require("../helper/service-layer-credit-memo-request.js");

const { upload } = serviceLayerHelper; 

//Base URL: api/v1/service/credit-memo-request
router.route("/")
.post(checkUserPermission([portalModules.CREDIT_MEMO_REQUEST], permissions.CREATE), upload.single("attachment"), controller.create);

module.exports = router;