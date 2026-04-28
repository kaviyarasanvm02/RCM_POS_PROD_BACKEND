const { dbCreds } = require("./hana-db");

/**
 * Get Tax info
 * OVTG = Tad Definition table
 */
exports.selectTaxInfo = 
`SELECT "Name", "Code", "Rate" FROM ${dbCreds.CompanyDB}.OVTG
WHERE "Inactive" = 'N'`;

exports.selectSalesEmployees =
`SELECT T0."SlpCode", T0."SlpName", T0."Active", T3."SalesDisc"
    FROM ${dbCreds.CompanyDB}.OSLP T0
    LEFT JOIN ${dbCreds.CompanyDB}.OHEM T1 ON T0."SlpCode" = T1."salesPrson"
    LEFT JOIN ${dbCreds.CompanyDB}.OUSR T3 ON T1."userId" = T3."USERID"
    WHERE T0."Active" ='Y'`;

exports.selectPaymentTerms = 
`SELECT T0."GroupNum" "PaymentTermCode", T0."PymntGroup" FROM ${dbCreds.CompanyDB}.OCTG T0`;

exports.selectBankInfo = 
`SELECT T0."BankCode", T0."BankName" FROM ${dbCreds.CompanyDB}.ODSC T0 WHERE T0."CountryCod" ='FJ'`;
