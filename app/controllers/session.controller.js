const { cookieName, httpStatusCodes, recordState } = require("../config/config");
const { formatDate } = require("../utils/utils");
const { updateUserSessionLog } = require("../entities/services/user-session-log.service");
// BUG FIX: Import invalidateSLCache to clear the server-side in-memory SL cookie on logout.
// Previously the cookie was only cleared from the session, not from the module-level memory variable.
const { invalidateSLCache } = require("../helper/service-layer-login");

/**
 * Gets the Username & Permission from `session`
 **/
exports.get = async (req, res, next) => {
  try {
    let { permissions, userName, displayUserName, userId, userSessionLog, storeWHCode, userTIN, userGroup } = req.session;
    
    // Fallback: If root session properties are missing, try to recover from userSessionLog
    if (!userGroup && userSessionLog?.userGroup) userGroup = userSessionLog.userGroup;
    if (!displayUserName && userSessionLog?.displayUserName) displayUserName = userSessionLog.displayUserName;

    console.log("LOG LOGIN - BACKEND - session data retrieved:", { userName, displayUserName, userId, userGroup });
    res.send({ permissions, userName, displayUserName, userId, userSessionLog, storeWHCode, userTIN, userGroup });
  }
  catch (err) {
    console.error("Error getting Session data!");
    next(err);
  }
}

/**
 * Destroy the `session` and clears the cookie
 **/
exports.delete = async (req, res, next) => {
  console.log("Destroying session!");
  // console.log("req.session: ", req.session);
  try {
    if (req.session && req.session.cookie) {
      //Set the Logout Time & Session status
      if (req.session.userSessionLog && req.session.userSessionLog.userSessionLogId) {
        const updatedLog = {
          sessionStatus: recordState.INACTIVE,
          logoutTime: formatDate(new Date(), "YYYY-MM-DD HH24:MI:SS.FF2")
        }
        await updateUserSessionLog(req.session.userSessionLog.userSessionLogId, updatedLog);
      }
      res.clearCookie(cookieName, { path: '/' });

      req.session.destroy(err => {
        if (err) {
          throw err;
        }
      });

      // BUG FIX: Clear the server-side in-memory SL cookie so the next user to login
      // gets a fresh SL connection instead of potentially reusing the previous user's cookie.
      invalidateSLCache(req);
    }
    res.status(httpStatusCodes.OK).json({ message: "Logged out successfully!" });
  }
  catch (err) {
    console.error("Error destroying session!");
    next(err);
  }
}