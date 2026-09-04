const express = require("express");
const router = new express.Router();
const controller = require("../controllers/custom-voucher.js");
const { checkUserPermission } = require("../handler/session-handler.js");
const { portalModules, permissions } = require("../config/config.js");

// Base URL: /api/v1/custom/voucher
router
  .route("/validate")
  .post(checkUserPermission(portalModules.INVOICE, permissions.READ), controller.validate);

router
  .route("/redeem")
  .post(checkUserPermission(portalModules.INVOICE, permissions.CREATE), controller.redeem);

router
  .route("/:voucherNumber")
  .get(checkUserPermission(portalModules.INVOICE, permissions.READ), controller.getVoucherDetails);

module.exports = router;
