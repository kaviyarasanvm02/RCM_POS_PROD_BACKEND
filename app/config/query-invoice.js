const { dbCreds } = require("./hana-db");

/**
 * Get Open Invoices
 * 
 * OINV - Invoice Header table
 * 
 * T1."U_NAME" AS "Created By"
 *  OUSR T1
 * WHERE T0."UserSign" = T1."USERID"
 * 
 * T0."DocStatus"='O'
    AND T1."LineStatus" ='O'
    ORDER BY T0."DocNum"
*/
exports.invoice =
  `SELECT DISTINCT T0."DocNum", T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocDueDate", T0."BPLId" AS "branch",
    T0."CardCode", T0."CardName", T2."Cellular", T0."NumAtCard", T2."LicTradNum", T2."QryGroup36", T4."U_Change" as "Change",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
    T0."VatSum", T0."VatPercent", T0."GroupNum" "PaymentTermCode", T0."U_PaymentType", T0."SlpCode" "SalesPersonCode",
    T5."SlpName" "SalesPersonName",
    T0."Address2" "ShipTo", T0."U_CODEmail", T0."U_CODCntName", T0."U_CODTlePhone", T0."U_Location", T0."U_IsReprinted",
    T0."U_AmtTender", T0."U_DeliveryApp"
      FROM ${dbCreds.CompanyDB}.OINV T0
      INNER JOIN ${dbCreds.CompanyDB}.INV1 T1 ON T0."DocEntry" = T1."DocEntry"
      LEFT JOIN ${dbCreds.CompanyDB}.OCRD T2 ON T0."CardCode" = T2."CardCode"
      LEFT JOIN ${dbCreds.CompanyDB}.RCT2 T3 ON T0."DocEntry" = T3."DocEntry"
      LEFT JOIN ${dbCreds.CompanyDB}.ORCT T4 ON T3."DocNum" = T4."DocEntry"
      LEFT JOIN ${dbCreds.CompanyDB}.OSLP T5 ON T0."SlpCode" = T5."SlpCode"
    WHERE T0."DocType"='I'
      AND T0."DocEntry" = T1."DocEntry"`;
// T0."U_CODAddress", T0."U_License", T0."U_FNPFNO", T0."U_TINNO", T0."U_VoterID"

/**
 * Get Open Items Details under an Invoice
 * OINV - Invoice Header table
 * OITM - Item Master Table   
 * 
 * T1."LineStatus" = 'O'
    AND 
 */
exports.itemListForInvoice =
  `SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", IFNULL(TO_VARCHAR(T1."U_DocNum"), (SELECT MIN(B."BatchNum") FROM ${dbCreds.CompanyDB}.IBT1 B WHERE B."BaseEntry" = T1."DocEntry" AND B."BaseLinNum" = T1."LineNum" AND B."BaseType" = 13)) AS "BundleNo", 
    T1."Quantity", T1."OpenQty", T1."Price", T1."DiscPrcnt" "DiscountPercent", T1."unitMsr" "UomCode", T1."VatGroup",
    T1."WhsCode", T10."WhsName", T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."LineTotal", T1."U_ReturnedQty", T1."U_RemainingOpenQty", T1."PriceAfVAT" as "NetUnitPrice", T1."PriceBefDi" "PriceBeforDiscount", T1."U_DeliveryApp",  ITM."ManSerNum",
    ITM."WarrntTmpl",
    (SELECT E."ItmsGrpNam" FROM  ${dbCreds.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod"=ITM."ItmsGrpCod") AS "ItmsGrpName", 
    ITM."ItmsGrpCod",
    IFNULL((SELECT SUM(S1."U_NoOfPcs") FROM  ${dbCreds.CompanyDB}."@OSBS" S0
        INNER JOIN  ${dbCreds.CompanyDB}."@SBS1" S1 ON S0."DocEntry" = S1."DocEntry" 
        WHERE S0."DocNum" = T1."U_DocNum" GROUP by S1."DocEntry"), 0) AS "Pcs",
     IFNULL((SELECT SUM(S1."U_SelQty") FROM  ${dbCreds.CompanyDB}."@OSBS" S0
        INNER JOIN  ${dbCreds.CompanyDB}."@SBS1" S1 ON S0."DocEntry" = S1."DocEntry" 
        WHERE S0."DocNum" = T1."U_DocNum" GROUP by S1."DocEntry"), 0) AS "Volume",
     T1."CogsOcrCod" AS "COGSBranch",
    ITM."U_FCCC" AS "FCCCItem", ITM."TreeType", T1."TreeType" AS "LineTreeType",
    CASE 
      WHEN EXISTS (
        SELECT 1 
        FROM ${dbCreds.CompanyDB}.SPP1 P WHERE P."ItemCode" = ITM."ItemCode" 
          AND CURRENT_DATE >= P."FromDate" AND CURRENT_DATE <= P."ToDate" 
            AND (P."CardCode" = T0."CardCode" OR P."CardCode" = '*1')
      ) THEN 'Y'
      ELSE 'N'
      END AS "DiscApplied",
      T0."U_IsReprinted"
  FROM ${dbCreds.CompanyDB}.OINV T0
    INNER JOIN ${dbCreds.CompanyDB}.INV1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${dbCreds.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
    LEFT JOIN ${dbCreds.CompanyDB}.OWHS T10 ON T1."WhsCode" = T10."WhsCode"
  WHERE T0."DocNum" IN `;

exports.invoiceFircaURL =
  `SELECT T0."DocNum", T0."U_VerifyURL"
    FROM ${dbCreds.CompanyDB}.OINV T0
  WHERE T0."DocNum" = ?`;

exports.invoiceAttachmentEntry =
  `SELECT T0."DocNum", T0."AtcEntry"
    FROM ${dbCreds.CompanyDB}.OINV T0
  WHERE T0."DocEntry" = ?`;

exports.invoiceUDFData =
  `SELECT T0."DocNum", T0."U_InvCount", T0."U_SDCTime", T0."U_SDCInvNum", T0."U_VehicleNo", T0."U_TINNO"
    FROM ${dbCreds.CompanyDB}.OINV T0
  WHERE T0."DocNum" = ?`;

exports.updateTransRef =
  `UPDATE ${dbCreds.CompanyDB}.OCRH T0
    SET T0."TransRef" = ? 
      WHERE T0."RctAbs" = ?;`

exports.updateInvoiceItem =
  `UPDATE ${dbCreds.CompanyDB}.INV1 T1 SET
    T1."U_ReturnedQty" = ?, T1."U_RemainingOpenQty" = ?
  WHERE T1."DocEntry" = ? AND T1."LineNum" = ?`;

exports.updateInvoiceReprintStatus =
  `UPDATE ${dbCreds.CompanyDB}.OINV T0 SET
    T0."U_IsReprinted" = 'Y'
  WHERE T0."DocEntry" = ?`;

exports.invoiceDeliveyCodeData =
  `SELECT T0."DeliveryCode", T0."DocNum",
    FROM ${dbCreds.CompanyDB}.OINV T0
  WHERE T0."DocNum" = ?`;

exports.updateSalesBatchSelectionDocNum =
  `UPDATE ${dbCreds.CompanyDB}.INV1 T1 SET
    T1."U_DocNum" = ?
  WHERE T1."DocEntry" = ? AND T1."ItemCode" = ? AND T1."LineNum" = ?`;

// Here we get the unique id from the invoice
exports.getUniqueId =
  `SELECT T0."DocNum", T0."DocEntry"
    FROM ${dbCreds.CompanyDB}.OINV T0
  WHERE T0."U_POS_TransactionID" = ?`;

exports.AttachmentPath =
  `SELECT T0."AttachPath"
    FROM ${dbCreds.CompanyDB}.OADP T0`;

exports.getTimberItems =
  `SELECT DISTINCT I1."ItemCode", I1."WhsCode", I1."LineNum" + 1 AS "SNo", T9."BatchNum", 
    T9."Quantity" AS "SelectedQty", T25."U_Length", T25."U_Height", T25."U_Width",
    (T9."Quantity" / ((T25."U_Height" / 1000) * (T25."U_Width" / 1000) * T25."U_Length")) AS "NoofPieces",
    ITM."ItemName" AS "Description", T10."WhsName", T10."Street", T10."Block", T10."City"
      FROM ${dbCreds.CompanyDB}."IBT1" T9
      INNER JOIN ${dbCreds.CompanyDB}."OIBT" T25 
          ON T9."BatchNum" = T25."BatchNum" AND T25."ItemCode" = T9."ItemCode"
      LEFT JOIN ${dbCreds.CompanyDB}."@SBS1" SBS1 
          ON SBS1."U_Batch" = T25."BatchNum"
      INNER JOIN ${dbCreds.CompanyDB}."INV1" I1 
          ON I1."DocEntry" = T9."BaseEntry" AND I1."ItemCode" = T9."ItemCode"
      INNER JOIN ${dbCreds.CompanyDB}."OINV" I0 
          ON I1."DocEntry" = I0."DocEntry"
      LEFT JOIN ${dbCreds.CompanyDB}."OITM" ITM 
          ON ITM."ItemCode" = I1."ItemCode"
      LEFT JOIN ${dbCreds.CompanyDB}."OWHS" T10 
          ON I1."WhsCode" = T10."WhsCode"
      WHERE 
          I0."DocEntry" = ?
          AND ITM."ItmsGrpCod" = '156'`;
exports.getSalesEmployeeDiscount =
  `SELECT T3."SalesDisc"
    FROM ${dbCreds.CompanyDB}.OSLP T0
    LEFT JOIN ${dbCreds.CompanyDB}.OHEM T1 ON T0."SlpCode" = T1."salesPrson"
    LEFT JOIN ${dbCreds.CompanyDB}.OUSR T3 ON T1."userId" = T3."USERID"
    WHERE T0."SlpCode" = ?`;
