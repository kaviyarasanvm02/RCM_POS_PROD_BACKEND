const express = require("express");
const router = new express.Router();
const controller = require("../controllers/custom-sales-quotation");
const { checkUserPermission } = require("../handler/session-handler");
const { portalModules, permissions } = require("../config/config");

//Base URL: /api/v1/custom/sales-quotation
router.route("/")
.get(checkUserPermission(portalModules.SALES_QUOTATION, permissions.READ), controller.get);

router.route("/items")
.get(checkUserPermission(portalModules.SALES_QUOTATION, permissions.READ), controller.getItems);

router.route("/timber-tally-items")
.get(checkUserPermission(portalModules.SALES_QUOTATION, permissions.READ), controller.getTimberTallyItems);

router.route("/reprint")
.patch(checkUserPermission(portalModules.SALES_QUOTATION, permissions.READ), controller.updateReprint);

module.exports = router;