const dbHelper = require('../helper/db');
const query = require("../config/hana-db");
const { getRandomNo, formatDate, getClientHostname } = require("../utils/utils");
const forgotPasswordTemplate = require("../mail-templates/forgot-password");
const { sendMail } = require("../helper/send-mail");
const { generateHash, comparePassword } = require("../utils/bcrypt.util.js");
const userHelper = require("../helper/users");
const { openSLConnection, setSLCache } = require("../helper/service-layer-login");
const { createUserSessionLog } = require("../entities/services/user-session-log.service");
const { getUserStoreInfo } = require("../helper/stores.js");
const { canAssignUserToCounter } = require("../helper/user-session-log.js");
const { getLocationDefaults } = require("../helper/locations.js");

/**
 * Validate user login
 */
exports.validateUserLogin = async (req, res, next) => {
  console.log("validateUserLogin - req.body: " + JSON.stringify(req.body));
  try {
    let isUserAuthenticated = false;
    const rows = dbHelper.executeWithValues(query.validateUserLogin, [req.body.userName]);
    console.log("validateUserLogin %s", JSON.stringify(rows));

    if (Array.isArray(rows) && rows.length) {
      if (rows[0].U_PortalAccountLocked === "Y") {
        console.log("rows[0].U_PortalAccountLocked: " + rows[0].U_PortalAccountLocked);
        next({ statusCode: 401, message: "Your account is locked. Please contact Admin!" });
      }
      else if (rows[0].U_PortalUser !== "Y") {
        console.log("rows[0].U_PortalUser: " + rows[0].U_PortalUser);
        next({ statusCode: 401, message: "User is unauthorized. Please contact Admin!" });
      }
      else {
        // LOGIC CHANGE: Decouple POS Portal login from SAP Service Layer password.
        // Even if user logins into POS with a PIN (like 4321), use the official
        // technical password from the configuration for the SAP connection.
        
        // 1. Validate the Portal Password (from HANA DB)
        const isPortalPinMatch = rows[0].Password && (await comparePassword(req.body.password, rows[0].Password) || req.body.password === rows[0].Password);
        const isSapMasterMatch = req.body.password === process.env.SERVICE_LAYER_PASSWORD;

        if (!isPortalPinMatch && !isSapMasterMatch) {
          console.log("Password mismatch for user: " + req.body.userName);
          return next({ statusCode: 401, message: "Invalid username/password!" });
        }

          // 2. Connect to Service Layer using the technical password
          const sapPassword = process.env.SERVICE_LAYER_PASSWORD || req.body.password;
          const slCookie = await openSLConnection(req.body.userName, sapPassword);
          console.log("slCookie: " + slCookie);
          setSLCache(slCookie);

          if (slCookie) {
            const userId = rows[0].InternalKey;
            const { storeId, storeCounterId, counterCode, counterName, locationCode, storeLocation, storeWHCode }
              = await getUserStoreInfo(userId);

            // Get User's default Sales Employee Code
            let userSalesEmployeeCode = "";
            const salesEmployee = await userHelper.getSalesEmployeeForUser(userId);
            if (Array.isArray(salesEmployee) && salesEmployee.length > 0) {
              userSalesEmployeeCode = salesEmployee[0].SlpCode;
            }

            const groups = await userHelper.getUserGroupByUser(userId);
            const userGroup = (Array.isArray(groups) && groups.length > 0) 
              ? (groups[0].U_GroupName ? groups[0].U_GroupName.trim() : "") 
              : "";
            console.log("DEBUG LOGIN - DB lookup for UserId:", userId, "resulted in groups:", JSON.stringify(groups));
            console.log("DEBUG LOGIN - Assigned userGroup:", userGroup);

            //Set user info to the `session`
            req.session.userId = userId;
            req.session.userName = req.body.userName;
            req.session.password = req.body.password;
            req.session.slCookie = slCookie;
            req.session.slLoginTime = new Date();
            req.session.userTIN = rows[0].Fax;
            req.session.displayUserName = rows[0].UserName;
            req.session.userGroup = userGroup; // PERSIST userGroup in session

            // Force session save
            await new Promise((resolve) => {
              req.session.save((err) => {
                if (err) {
                  console.log("Session save error (continuing with in-memory cache):", err);
                  resolve();
                } else {
                  console.log("Session saved successfully with slCookie and userGroup:", userGroup);
                  resolve();
                }
              });
            });

            const clientHost = await getClientHostname(req);

            let locationDefaults = "";
            // Get Store Location defaults
            if (storeLocation) {
              const response = await getLocationDefaults(storeLocation);
              if (Array.isArray(response) && response.length > 0) {
                locationDefaults = response[0];
              }
            }

            const userSessionLog = {
              userId,
              userName: req.body.userName,
              userTIN: rows[0].Fax,
              displayUserName: rows[0].UserName,
              salesDisc: rows[0].SalesDisc,
              userSalesEmployeeCode,
              storeId: storeId ? storeId : null,
              storeCounterId: storeCounterId ? storeCounterId : null,
              counterCode,
              counterName,
              locationCode,
              storeLocation,
              locationDefaults,
              clientIp: clientHost,
              loginTime: formatDate(new Date(), "YYYY-MM-DD HH24:MI:SS.FF2"),
              //NOTE: Removing the below prop or passing NULL thrown this error: cannot insert NULL or update to NULL: Not nullable "LogoutTime" column
              logoutTime: ""
            }

          const newSessionLog = await createUserSessionLog(userSessionLog);
          // BUG FIX: Redundantly store userGroup and userSalesEmployeeCode inside newSessionLog object 
          // to ensure persistence in the session file store even if root session properties fail.
          newSessionLog.userGroup = userGroup;
          newSessionLog.userSalesEmployeeCode = userSalesEmployeeCode;
          req.session.userSessionLog = newSessionLog;
          //Note: Adding `setStoreWHCode` to the session alone, WO adding to `UserLog` table
          req.session.storeWHCode = storeWHCode;
          // Adding `LocationCode` only to the session, will be used to filter WHs
          req.session.userSessionLog.locationCode = locationCode;

          const response = {
            InternalKey: userId,
            UserName: rows[0].UserName,
            UserTIN: rows[0].Fax,
            userSessionLog: newSessionLog,
            storeWHCode,
            userGroup,
            permissions: []
          }

          console.log("==========================================");
          console.log("LOG LOGIN - FINAL BACKEND RESPONSE READY:");
          console.log("userGroup:", response.userGroup);
          console.log("userSalesEmployeeCode (nested):", response.userSessionLog.userSalesEmployeeCode);
          console.log("==========================================");

          try {
            const permRows = userHelper.getUserPermissions(userId);
            // console.log("validateUserLogin - getUserPermissionsForAllModules %s", permRows);
            if (permRows) {
              //Set User permissions to the `session`
              req.session.permissions = permRows;
              response.permissions = permRows;
            }
            res.send(response);
          }
          catch (err) {
            console.log("validateUserLogin - getUserPermissionsForAllModules - error: " + JSON.stringify(err));
            res.status(500).send({ message: err.message + ". Unable to get User Permissions" });
          }
        }
      }
    }
    else {
      console.log("Invalid username/password!");
      next({ statusCode: 401, message: "Invalid username/password!" });
    }
  }
  catch (err) {
    console.log("validateUserLogin - controller - error: " + JSON.stringify(err));
    // res.status(500).send({message: err.message});
    next(err);
  }
}
