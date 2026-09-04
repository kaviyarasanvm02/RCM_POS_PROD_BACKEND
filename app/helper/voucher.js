const dbHelper = require("./db.js");
const { dbCreds } = require("../config/hana-db.js");
const { formatDate } = require("../utils/utils.js");

/**
 * Fetch voucher details by serial / voucher number
 * Checks OSRI joined with OITM for item name and voucher denomination
 * @param {string} voucherNumber
 * @returns {object|null}
 */
const getVoucherBySerial = (voucherNumber) => {
  try {
    const trimmedSerial = (voucherNumber || "").trim();
    if (!trimmedSerial) return null;

    // 1. Query OSRN (Serial Number Master table)
    const sqlOSRN = `
      SELECT 
        o."DistNumber" AS "VoucherNum",
        o."ItemCode",
        o."InDate",
        o."ExpDate",
        o."Status",
        COALESCE(o."U_Redeemed", 'N') AS "U_Redeemed",
        c."ItemName",
        c."U_VoucherValue"
      FROM ${dbCreds.CompanyDB}."OSRN" o
      LEFT JOIN ${dbCreds.CompanyDB}."OITM" c ON o."ItemCode" = c."ItemCode"
      WHERE UPPER(TRIM(o."DistNumber")) = UPPER(?)
    `;

    let rows = dbHelper.executeWithValues(sqlOSRN, [trimmedSerial]);
    if (rows && rows.length > 0) {
      return rows[0];
    }

    // 2. Fallback to OSRI if not found in OSRN
    const sqlOSRI = `
      SELECT 
        b."IntrSerial" AS "VoucherNum",
        b."ItemCode",
        b."InDate",
        b."ExpDate",
        b."Status",
        COALESCE(b."U_Redeemed", 'N') AS "U_Redeemed",
        c."ItemName",
        c."U_VoucherValue"
      FROM ${dbCreds.CompanyDB}."OSRI" b
      LEFT JOIN ${dbCreds.CompanyDB}."OITM" c ON b."ItemCode" = c."ItemCode"
      WHERE UPPER(TRIM(b."IntrSerial")) = UPPER(?)
    `;

    rows = dbHelper.executeWithValues(sqlOSRI, [trimmedSerial]);
    if (rows && rows.length > 0) {
      return rows[0];
    }

    return null;
  } catch (err) {
    console.error("getVoucherBySerial error:", err);
    throw err;
  }
};

/**
 * Atomically redeem voucher in OSRN and OSRI tables (base tables for serial numbers)
 * Returns the number of affected rows (1 if successful, 0 if already redeemed or not found)
 * @param {string} voucherNumber
 * @returns {number}
 */
const redeemVoucher = (voucherNumber) => {
  try {
    const trimmedSerial = (voucherNumber || "").trim();
    if (!trimmedSerial) return 0;

    const sqlOSRN = `
      UPDATE ${dbCreds.CompanyDB}."OSRN"
      SET "U_Redeemed" = 'Y', "Status" = 1
      WHERE UPPER(TRIM("DistNumber")) = UPPER(?)
        AND COALESCE("U_Redeemed", 'N') <> 'Y'
    `;

    const sqlOSRI = `
      UPDATE ${dbCreds.CompanyDB}."OSRI"
      SET "U_Redeemed" = 'Y', "Status" = 1
      WHERE UPPER(TRIM("IntrSerial")) = UPPER(?)
        AND COALESCE("U_Redeemed", 'N') <> 'Y'
    `;

    try {
      dbHelper.executeWithValues(sqlOSRI, [trimmedSerial]);
    } catch (e) {
      // Ignore if OSRI does not allow direct updates or UDF
    }

    const result = dbHelper.executeWithValues(sqlOSRN, [trimmedSerial]);
    // result from hana-client exec update is either number of affected rows or array
    const affectedRows =
      typeof result === "number"
        ? result
        : Array.isArray(result)
        ? result.length
        : result?.affectedRows ?? 1;
    return affectedRows;
  } catch (err) {
    console.error("redeemVoucher error:", err);
    throw err;
  }
};

/**
 * Check if a credit card code belongs to a Voucher card type
 * @param {string|number} creditCardCode
 * @returns {boolean}
 */
const isVoucherCard = (creditCardCode) => {
  if (!creditCardCode) return false;
  if (String(creditCardCode).toUpperCase() === "VOUCHER") return true;
  try {
    const sql = `SELECT "CreditCard", "CardName" FROM ${dbCreds.CompanyDB}."OCRC" WHERE "CreditCard" = ?`;
    const rows = dbHelper.executeWithValues(sql, [creditCardCode]);
    if (rows && rows.length > 0) {
      return (rows[0].CardName || "").toUpperCase().includes("VOUCHER");
    }
    return false;
  } catch (err) {
    console.error("isVoucherCard error:", err.message);
    return false;
  }
};

/**
 * Check if an item or serial number is a Gift Voucher
 * @param {string} itemCode
 * @param {string} [serialNumber]
 * @returns {boolean}
 */
const isGiftVoucher = (itemCode, serialNumber) => {
  try {
    if (serialNumber) {
      const voucher = getVoucherBySerial(serialNumber);
      if (
        voucher &&
        (Number(voucher.U_VoucherValue) > 0 ||
          (voucher.ItemName || "").toUpperCase().includes("VOUCHER") ||
          (voucher.ItemName || "").toUpperCase().includes("GIFT"))
      ) {
        return true;
      }
    }
    if (itemCode) {
      const sql = `SELECT "ItemCode", "ItemName", "U_VoucherValue" FROM ${dbCreds.CompanyDB}."OITM" WHERE "ItemCode" = ?`;
      const rows = dbHelper.executeWithValues(sql, [itemCode]);
      if (rows && rows.length > 0) {
        const item = rows[0];
        return (
          Number(item.U_VoucherValue) > 0 ||
          (item.ItemName || "").toUpperCase().includes("VOUCHER") ||
          (item.ItemName || "").toUpperCase().includes("GIFT")
        );
      }
    }
    return false;
  } catch (err) {
    console.error("isGiftVoucher error:", err.message);
    return false;
  }
};

/**
 * Update InDate (Admission Date = tomorrow) and ExpDate (Expiration Date = 1 year from tomorrow)
 * for a sold / issued serialized Gift Voucher in OSRN and OSRI
 * @param {string} itemCode
 * @param {string} serialNumber
 * @param {Date|string} [postingDate]
 * @returns {boolean}
 */
const updateVoucherValidityDates = (itemCode, serialNumber, postingDate = new Date()) => {
  try {
    const trimmedSerial = (serialNumber || "").trim();
    if (!trimmedSerial) return false;

    const base = new Date(postingDate || new Date());
    const tomorrow = new Date(base.getFullYear(), base.getMonth(), base.getDate() + 1, 0, 0, 0);
    const expDate = new Date(tomorrow.getFullYear() + 1, tomorrow.getMonth(), tomorrow.getDate(), 23, 59, 59);

    const inDateStr = formatDate(tomorrow, "YYYY-MM-DD");
    const expDateStr = formatDate(expDate, "YYYY-MM-DD");

    console.log(`[BACKEND] Setting Voucher Validity for Serial ${trimmedSerial} (Item: ${itemCode}): InDate = ${inDateStr}, ExpDate = ${expDateStr}`);

    const sqlOSRN = `
      UPDATE ${dbCreds.CompanyDB}."OSRN"
      SET "InDate" = ?, "ExpDate" = ?
      WHERE UPPER(TRIM("DistNumber")) = UPPER(?)
        AND ("ItemCode" = ? OR ? IS NULL)
    `;

    const sqlOSRI = `
      UPDATE ${dbCreds.CompanyDB}."OSRI"
      SET "InDate" = ?, "ExpDate" = ?
      WHERE UPPER(TRIM("IntrSerial")) = UPPER(?)
        AND ("ItemCode" = ? OR ? IS NULL)
    `;

    try {
      dbHelper.executeWithValues(sqlOSRI, [inDateStr, expDateStr, trimmedSerial, itemCode || null, itemCode || null]);
    } catch (e) {
      // Ignore if OSRI does not allow direct update
    }

    const res = dbHelper.executeWithValues(sqlOSRN, [inDateStr, expDateStr, trimmedSerial, itemCode || null, itemCode || null]);
    console.log(`[BACKEND] Voucher validity updated result:`, JSON.stringify(res));
    return true;
  } catch (err) {
    console.error(`[BACKEND] updateVoucherValidityDates error for ${serialNumber}:`, err.message);
    return false;
  }
};

module.exports = {
  getVoucherBySerial,
  redeemVoucher,
  isVoucherCard,
  isGiftVoucher,
  updateVoucherValidityDates,
};
