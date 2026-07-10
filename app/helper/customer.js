const dbHelper = require('../helper/db');
const query = require("../config/query-customer");

/**
 * @param {Object} req Filter params
 * @returns Get Customer info
 */
exports.getCustomerInfo = (req) => {
  let sql = query.selectCustomerInfo;
  if(req?.searchKey) {
    sql += ` AND (UPPER(T0."CardCode") LIKE UPPER('%${req.searchKey}%')
             OR UPPER(T0."CardName") LIKE UPPER('%${req.searchKey}%')
             OR T0."Cellular" LIKE '%${req.searchKey}%')`;
  }
  if(req?.oneTimeCustomer === 'Y') {
    sql += ` AND T0."U_OneTimeCustomer" = 'Y'`;
  }

  try {
    const result = dbHelper.executeWithValues(sql, []);
    // console.log("result: ", result);
    if(Array.isArray(result) && result.length > 0) {
      // Return the 1st rec. when the request is to get the One-time Customer
      if(req?.oneTimeCustomer === 'Y') {
        return result[0];
      }
      return result;
    }
    return [];
  }
  catch(err) {
    throw err;
  }
}

/**
 * Get Customer Address info using cardCode
 * @param {Number} cardCode 
 * @returns 
 */
exports.getCustomerAddress = (cardCode) => {
  try {
    const result = dbHelper.executeWithValues(query.selectCustomerAddress, [cardCode]);
    if(Array.isArray(result) && result.length > 0) {
      return result;
    }
    return [];
  }
  catch(err) {
    throw err;
  }
}

/**
 * Get Customer Contact person
 * @param {Number} cardCode 
 * @returns 
 */
exports.getCustomerContactPerson = (cardCode) => {
  try {
    const result = dbHelper.executeWithValues(query.selectCustomerContactPerson, [cardCode]);
    if(Array.isArray(result) && result.length > 0) {
      return result;
    }
    return [];
  }
  catch(err) {
    throw err;
  }
}

/**
 * Get Customer Special Price for an Item
 * @param {String} cardCode 
 * @param {String} itemCode
 * @returns 
 */
exports.getCustomerSpecialPrice = (cardCode, itemCode, whsCode) => {
  try {
    let specialPriceObj = null;

    // 1 Check customer-specific price
    const result1 = dbHelper.executeWithValues(
      query.selectCustomerSpecialPrice1,
      [itemCode, cardCode]
    );
    if(Array.isArray(result1) && result1.length > 0) {
      specialPriceObj = result1[0];
    } else {
      // 2 Check default '*1' price
      const result2 = dbHelper.executeWithValues(
        query.selectCustomerSpecialPrice2,
        [itemCode] // only itemCode because CardCode is hardcoded in query
      );

      if (Array.isArray(result2) && result2.length > 0) {
        specialPriceObj = result2[0]; // Found default price
      } else {
        const result3 = dbHelper.executeWithValues(
          query.selectCustomerSpecialPrice3,
          [whsCode, itemCode] // only itemCode because CardCode is hardcoded in query
        );

        if (Array.isArray(result3) && result3.length > 0) {
          specialPriceObj = result3[0]; // Found default price
        }
      }
    }

    if (specialPriceObj) {
      // Fetch volume discounts from SPP2
      const spp2Result = dbHelper.executeWithValues(
        query.selectVolumeDiscounts,
        [itemCode, cardCode]
      );
      if (Array.isArray(spp2Result) && spp2Result.length > 0) {
        specialPriceObj.volumeDiscounts = spp2Result;
      }
      return specialPriceObj;
    }

    // 3 No price found
    return "";
  }
  catch(err) {
    throw err;
  }
}