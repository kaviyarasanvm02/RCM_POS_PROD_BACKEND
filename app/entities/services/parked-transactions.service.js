const { dataSource } = require("../../services/database");
const entity = require("../parked-transactions.js");
const primaryKey = "parkedTransactionId";
const sortField = "parkedDateTime";
const defaultSortOrder = "ASC";
const {
  getStoreWarehouse,
} = require("./store-warehouses.service");

/**
 * Creates a new ParkedTransaction  rec. & returns it
 */
 exports.createParkedTransaction = async (data) => {
  try{
    const repository = dataSource.getRepository(entity);
    const newRec = await repository.save(data);
    return newRec;
  }
  catch(err) {
    throw err;
  } 
}

/**
 * 
 * @param {*} filter
 * @param {Number} noOfRecs No. recs to be returned
 */
exports.getParkedTransaction = async (filter, storeId, noOfRecs = null) => {
  // 🔹 Ensure storeId is included in the filter for DB-level performance
  if (storeId && !filter.storeId) {
    filter.storeId = storeId;
  }

  console.log("filter: ", JSON.stringify(filter));
  if (filter.id) {
    filter[primaryKey] = filter.id;
    delete filter.id;
  }

  try {
    const repository = dataSource.getRepository(entity);
    let records;

    // 🔹 Optimization: Fetch the warehouse list for the given storeId ONCE
    let warehouseList = [];
    if (storeId) {
      try {
        const warehouseResponse = await getStoreWarehouse({ storeId: storeId });
        warehouseList = (warehouseResponse || []).map(warehouse => warehouse.warehouseCode);
        console.log(`[BACKEND] Fetched ${warehouseList.length} warehouses for storeId ${storeId}`);
      } catch (whErr) {
        console.error(`[BACKEND] Error fetching warehouse list for storeId ${storeId}:`, whErr.message);
      }
    }

    if (noOfRecs === 1) {
      records = await repository.findOneBy(filter);
    }
    else {
      records = await repository.find({
        where: filter,
        order: {
          [sortField]: defaultSortOrder,
        }
      });
    }

    if (!records) {
      return [];
    }

    // Ensure records is always an array for consistent looping
    const recordsArray = Array.isArray(records) ? records : [records];
    const filteredRecords = [];

    for (const record of recordsArray) {
      const { data } = record;

      let parsedData;
      try {
        parsedData = JSON.parse(data);
      } catch (error) {
        console.error(`Error parsing data for record with storeId ${storeId}:`, error);
        continue;
      }

      // 🔹 Support both salesItems (Invoice) and salesQuotationItems (Sales Quotation)
      const items = parsedData.salesItems || parsedData.salesQuotationItems || [];

      // 🔹 Check if all WhsCode values in items match the warehouse list
      const allWhsCodesValid = items.every(item => {
        // If warehouseList is empty or missing, we allow the record (fall-back) 
        // to prevent users from losing access if master data is not configured correctly.
        if (!warehouseList || warehouseList.length === 0) return true;
        return warehouseList.includes(item.WhsCode);
      });

      if (allWhsCodesValid) {
        filteredRecords.push(record);
      }
    }
    return filteredRecords;
  }
  catch(err) {
    throw err;
  } 
}

/**
 * Get the latest `nextRefNum` from the `ParkedTransactions` table
 * @returns {Number} The `nextRefNum` to be used for the new transaction
 */
exports.getLatestNextRefNum = async () => {
  try {
    const repository = dataSource.getRepository(entity);

    // Find the latest record
    const latestRecords = await repository.find({
      order: {
        nextRefNum: "DESC"
      },
      take: 1
    });

    // If no records are found, start with 1
    if (latestRecords.length === 0) {
      return 1;
    }

    return latestRecords[0].nextRefNum;
  }
  catch (err) {
    throw err;
  }
}

/**
 * Delete a ParkedTransaction with the given Id
 * @param {Number}  id  PK
 */
exports.deleteParkedTransaction = async (id) => {
  try{
    const repository = dataSource.getRepository(entity);
    return await repository.delete({ [primaryKey]: id });
  }
  catch(err) {
    throw err;
  }
}
