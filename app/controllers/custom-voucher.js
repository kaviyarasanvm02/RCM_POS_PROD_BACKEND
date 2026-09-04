const helper = require("../helper/voucher.js");
const { formatDate } = require("../utils/utils.js");

/**
 * Validate voucher endpoint
 * POST /api/v1/custom/voucher/validate
 * Body: { voucherNumber: string, itemsTotal?: number }
 */
const validate = async (req, res, next) => {
  try {
    const voucherNumber = (req.body.voucherNumber || req.body.voucherNum || "").trim();
    const itemsTotal = req.body.itemsTotal !== undefined && req.body.itemsTotal !== null ? Number(req.body.itemsTotal) : null;

    if (!voucherNumber) {
      return res.status(400).send({
        success: false,
        code: "INVALID_REQUEST",
        message: "Please enter voucher reference number.",
      });
    }

    const voucher = helper.getVoucherBySerial(voucherNumber);

    // 1. Voucher Existence Check
    if (!voucher) {
      return res.status(404).send({
        success: false,
        code: "VOUCHER_NOT_FOUND",
        message: "Invalid voucher number.",
      });
    }

    // 2. Already Redeemed Check
    if (voucher.U_Redeemed === "Y") {
      return res.status(400).send({
        success: false,
        code: "VOUCHER_ALREADY_REDEEMED",
        message: "This voucher has already been redeemed.",
      });
    }

    // 3. Voucher Status Check in SAP (Status 1 = Unavailable / Redeemed in SAP)
    if (String(voucher.Status) === "1") {
      return res.status(400).send({
        success: false,
        code: "VOUCHER_NOT_AVAILABLE",
        message: "This voucher is unavailable or already redeemed.",
      });
    }

    // 4. InDate (Admission Date / Active Date) Check
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (voucher.InDate) {
      const inDate = new Date(voucher.InDate);
      inDate.setHours(0, 0, 0, 0);
      if (today < inDate) {
        return res.status(400).send({
          success: false,
          code: "VOUCHER_NOT_ACTIVE",
          message: `This voucher is not active yet. It will be active on ${formatDate(inDate, "DD/MM/YYYY")}.`,
        });
      }
    }

    // 5. ExpDate (Expiration Date) Check
    if (voucher.ExpDate) {
      const expDate = new Date(voucher.ExpDate);
      expDate.setHours(23, 59, 59, 999);
      if (today > expDate) {
        return res.status(400).send({
          success: false,
          code: "VOUCHER_EXPIRED",
          message: `This voucher expired on ${formatDate(expDate, "DD/MM/YYYY")}.`,
        });
      }
    }

    // 6. Voucher Value & Applied Amount (Supports multi-card and multi-mode payment)
    const voucherValue = Number(voucher.U_VoucherValue || 0);

    const appliedAmount =
      itemsTotal !== null && itemsTotal !== undefined && itemsTotal > 0
        ? Math.min(itemsTotal, voucherValue)
        : voucherValue;

    return res.status(200).send({
      success: true,
      code: "VOUCHER_VALID",
      message: "Voucher validated successfully.",
      data: {
        voucherNumber: voucher.VoucherNum,
        voucherValue: voucherValue,
        appliedAmount: appliedAmount,
        itemCode: voucher.ItemCode,
        itemName: voucher.ItemName,
        inDate: voucher.InDate ? formatDate(voucher.InDate, "YYYY-MM-DD") : null,
        expDate: voucher.ExpDate ? formatDate(voucher.ExpDate, "YYYY-MM-DD") : null,
        redeemed: false,
      },
    });
  } catch (err) {
    console.error("custom-voucher validate error:", err);
    next(err);
  }
};

/**
 * Redeem voucher endpoint
 * POST /api/v1/custom/voucher/redeem
 * Body: { voucherNumber: string, invoiceNumber?: string }
 */
const redeem = async (req, res, next) => {
  try {
    const voucherNumber = (req.body.voucherNumber || req.body.voucherNum || "").trim();
    const invoiceNumber = req.body.invoiceNumber || "";

    if (!voucherNumber) {
      return res.status(400).send({
        success: false,
        code: "INVALID_REQUEST",
        message: "Please enter voucher reference number.",
      });
    }

    // Pre-check voucher state
    const voucher = helper.getVoucherBySerial(voucherNumber);
    if (!voucher) {
      return res.status(404).send({
        success: false,
        code: "VOUCHER_NOT_FOUND",
        message: "Invalid voucher number.",
      });
    }

    if (voucher.U_Redeemed === "Y") {
      return res.status(400).send({
        success: false,
        code: "VOUCHER_ALREADY_REDEEMED",
        message: "This voucher has already been redeemed.",
      });
    }

    if (String(voucher.Status) === "1") {
      return res.status(400).send({
        success: false,
        code: "VOUCHER_NOT_AVAILABLE",
        message: "This voucher is unavailable or already redeemed.",
      });
    }

    // InDate Check
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (voucher.InDate) {
      const inDate = new Date(voucher.InDate);
      inDate.setHours(0, 0, 0, 0);
      if (today < inDate) {
        return res.status(400).send({
          success: false,
          code: "VOUCHER_NOT_ACTIVE",
          message: `This voucher is not active yet. It will be active on ${formatDate(inDate, "DD/MM/YYYY")}.`,
        });
      }
    }

    // ExpDate Check
    if (voucher.ExpDate) {
      const expDate = new Date(voucher.ExpDate);
      expDate.setHours(23, 59, 59, 999);
      if (today > expDate) {
        return res.status(400).send({
          success: false,
          code: "VOUCHER_EXPIRED",
          message: `This voucher expired on ${formatDate(expDate, "DD/MM/YYYY")}.`,
        });
      }
    }

    // Execute atomic update
    const affected = helper.redeemVoucher(voucherNumber);
    if (!affected || affected === 0) {
      return res.status(400).send({
        success: false,
        code: "VOUCHER_ALREADY_REDEEMED",
        message: "This voucher has already been redeemed.",
      });
    }

    return res.status(200).send({
      success: true,
      code: "VOUCHER_REDEEMED",
      message: "Voucher redeemed successfully.",
      data: {
        voucherNumber: voucher.VoucherNum,
        invoiceNumber,
      },
    });
  } catch (err) {
    console.error("custom-voucher redeem error:", err);
    next(err);
  }
};

/**
 * Get voucher details by serial
 * GET /api/v1/custom/voucher/:voucherNumber
 */
const getVoucherDetails = async (req, res, next) => {
  try {
    const voucherNumber = (req.params.voucherNumber || "").trim();
    if (!voucherNumber) {
      return res.status(400).send({
        success: false,
        code: "INVALID_REQUEST",
        message: "Voucher number parameter is required.",
      });
    }

    const voucher = helper.getVoucherBySerial(voucherNumber);
    if (!voucher) {
      return res.status(404).send({
        success: false,
        code: "VOUCHER_NOT_FOUND",
        message: "Voucher not found.",
      });
    }

    return res.status(200).send({
      success: true,
      data: {
        voucherNumber: voucher.VoucherNum,
        voucherValue: Number(voucher.U_VoucherValue || 0),
        itemCode: voucher.ItemCode,
        itemName: voucher.ItemName,
        status: voucher.Status,
        inDate: voucher.InDate ? formatDate(voucher.InDate, "YYYY-MM-DD") : null,
        expDate: voucher.ExpDate ? formatDate(voucher.ExpDate, "YYYY-MM-DD") : null,
        redeemed: voucher.U_Redeemed === "Y",
      },
    });
  } catch (err) {
    console.error("custom-voucher getVoucherDetails error:", err);
    next(err);
  }
};

module.exports = {
  validate,
  redeem,
  getVoucherDetails,
};
