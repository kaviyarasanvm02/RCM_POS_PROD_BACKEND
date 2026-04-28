const storeService = require("../entities/services/stores.service.js");
const storeWarehouseService = require("../entities/services/store-warehouses.service.js");
const storeCounterService = require("../entities/services/store-counters.service.js");
const storeUsersService = require("../entities/services/store-users.service.js");
const userSessionLogService = require("../entities/services/user-session-log.service.js");

/**
 * Gets the Store Location & Counter info for the give user
 * @param {*} userId 
 */
exports.getUserStoreInfo = async (userId) => {
  try {
    let storeId = null, storeCounterId = null, counterCode = "", counterName = "";
    let locationCode = "", storeLocation = "", storeWHCode = "";

    console.log(`LOG LOGIN - Starting Store/Terminal lookup for UserId: ${userId}`);

    // 1. Get the user's primary Store assignment from StoreUsers table
    const storeUser = await storeUsersService.getStoreUser({ userId });
    if (Array.isArray(storeUser) && storeUser.length > 0) {
      storeId = storeUser[0].storeId;
      console.log(`LOG LOGIN - Found primary Store assignment: StoreId ${storeId}`);
    }

    // 2. Get the specific Counter assignment for this user
    // If we already have a storeId, prioritize counters within that store to avoid cross-branch picking
    const counterFilter = storeId ? { userId, storeId } : { userId };
    const storeCounters = await storeCounterService.getStoreCounter(counterFilter);
    
    if (Array.isArray(storeCounters) && storeCounters.length > 0) {
      let selectedCounter = null;

      // If multiple counters are found (e.g. user moved branches but old assignment exists),
      // we prioritize the one they used most recently in the session logs.
      if (storeCounters.length > 1) {
        console.log(`LOG LOGIN - WARNING: Multiple terminals (${storeCounters.length}) found for user ${userId}. Checking last used terminal...`);
        const recentLogs = await userSessionLogService.getUserSessionLog({ userId }, 5);
        if (Array.isArray(recentLogs) && recentLogs.length > 0) {
          // Find the first counter in our list that matches any of the recent session logs
          for (const log of recentLogs) {
            const match = storeCounters.find(c => c.storeCounterId === log.storeCounterId);
            if (match) {
              selectedCounter = match;
              console.log(`LOG LOGIN - Stickiness: Picking last used terminal: ${selectedCounter.counterName}`);
              break;
            }
          }
        }
      }

      // Fallback to the first found counter if no match in recent logs
      if (!selectedCounter) {
        selectedCounter = storeCounters[0];
      }
      
      // If we didn't have a storeId yet (e.g. user not in StoreUsers), grab it from the counter
      if (!storeId) {
        storeId = selectedCounter.storeId;
        console.log(`LOG LOGIN - StoreId inferred from terminal: ${storeId}`);
      }
      
      storeCounterId = selectedCounter.storeCounterId;
      counterCode = selectedCounter.counterCode;
      counterName = selectedCounter.counterName;
      console.log(`LOG LOGIN - Final Terminal assignment: ${counterName} (${counterCode})`);
    } else {
      console.log(`LOG LOGIN - No terminal assignment found for user ${userId} (StoreId: ${storeId || 'None'})`);
    }

    if (storeId) {
      // Get User Store Details
      const store = await storeService.getStore({ storeId });
      if (Array.isArray(store) && store.length > 0) {
        locationCode = store[0].locationCode;
        storeLocation = store[0].location;

        // Get User Warehouse
        const storeWarehouse = await storeWarehouseService.getStoreWarehouse({ storeId });
        if (Array.isArray(storeWarehouse) && storeWarehouse.length > 0) {
          storeWHCode = storeWarehouse[0].warehouseCode;
        }
      }
    }

    return { storeId, storeCounterId, counterCode, counterName, locationCode, storeLocation, storeWHCode };
  }
  catch (err) {
    console.error(`LOG LOGIN - ERROR in getUserStoreInfo for user ${userId}:`, err);
    throw err;
  }
}