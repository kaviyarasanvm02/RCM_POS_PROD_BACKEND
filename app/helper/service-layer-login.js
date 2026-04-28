const { serviceLayerAPI } = require("../config/service-layer-api");
const { dbCreds, serviceLayerSessionMaxAge } = require("../config/hana-db.js");
const { getTimeDifference } = require("../utils/utils");
const axios = require("axios");
const https = require("https");

// Create a clean Axios instance strictly for Login to avoid 'Fail to NONE-SSO'
// caused by global Cookie defaults or axios-retry interceptors on serviceLayerAPI
const loginClient = axios.create({
  baseURL: process.env.SERVICE_LAYER_API_BASE_URL,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  headers: {
    "Content-Type": "text/json;charset=utf-8"
  }
});

// In-memory cache for SL connection (bypass session file errors)
let memorySlCookie = null;
let memorySlLoginTime = null;

/**
 * Returns a Service Layer connection if it exists or creates a new one & returns it
 * @param {Request} req 
 * @returns 
 */
const getSLConnection = async (req) => {
  try {
    // 1. Check in-memory variable
    if (memorySlCookie && memorySlLoginTime) {
      const timeiff = Math.abs(new Date() - new Date(memorySlLoginTime)) / 60000;
      console.log(`*** getSLConnection - in-memory cookie age: ${timeiff} min`);
      if (timeiff < (serviceLayerSessionMaxAge - 5)) {
        return memorySlCookie;
      }
    }

    // 2. Check session as fallback
    if (req.session.slCookie && req.session.slLoginTime) {
      const timeiff = Math.abs(new Date() - new Date(req.session.slLoginTime)) / 60000;
      console.log(`*** getSLConnection - session cookie exists, age: ${timeiff} min`);
      if (timeiff < (serviceLayerSessionMaxAge - 5)) {
        console.log("*** getSLConnection - returning SESSION CACHED SL cookie");
        memorySlCookie = req.session.slCookie;
        memorySlLoginTime = req.session.slLoginTime;
        return req.session.slCookie;
      }
    }

    console.log("*** getSLConnection - NO cached cookie or expired, RE-AUTHENTICATING...");

    // Use session credentials if available, otherwise fallback to dbCreds
    let reauthUserName = dbCreds.UserName;
    let reauthPassword = dbCreds.Password;

    if (req.session && req.session.userName && req.session.password) {
      console.log(`*** getSLConnection - Using session user credentials for: ${req.session.userName}`);
      reauthUserName = req.session.userName;
      // Always use the technical password for SL background connection
      reauthPassword = process.env.SERVICE_LAYER_PASSWORD || dbCreds.Password;
    } else {
      console.log("*** getSLConnection - Using fallback dbCreds");
    }

    const slCookie = await openSLConnection(reauthUserName, reauthPassword);

    // Set to memory
    memorySlCookie = slCookie;
    memorySlLoginTime = new Date().toISOString();

    // Set to session for backup
    req.session.slCookie = slCookie;
    req.session.slLoginTime = memorySlLoginTime;

    return slCookie;
  }
  catch (err) {
    throw err;
  }
}

/**
 * Opens a connection to Service Layer & returns a `cookie`
 * @param {String} userName
 * @param {String} password
 * @returns 
 */
const openSLConnection = async (userName, password) => {
  let cookie = null;
  try {
    const response = await loginClient.post('Login?prefer=return-no-content',
      { CompanyDB: dbCreds.CompanyDB, UserName: userName, Password: password }
    );

    console.log(`***Login - openSLConnection - response: ${response.status}`);

    // Convert array of cookies to a single concatenated string for SL
    const rawCookies = response.headers["set-cookie"];
    if (Array.isArray(rawCookies)) {
      cookie = rawCookies.map(c => c.split(';')[0]).join('; ');
    } else {
      cookie = rawCookies;
    }

    console.log("cookie: " + cookie);
    //console.log("response.headers: "+ JSON.stringify(response.headers));
    console.log("response.data.SessionId: " + response.data.SessionId);
    /*if ((response.status == "200" || response.status == "201") && cookie !== null)
      return cookie;
    else*/
    return cookie;
  }
  catch (error) {
    console.log("openSLConnection - error:", error?.response?.data || error.message);
    throw error;
  }
}

const openDBConnection = async () => {
  let cookie = null;
  try {
    const response = await loginClient.post('Login?prefer=return-no-content', dbCreds);
    console.log(`***Login - openDBConnection - response: ${response.status}`);

    // Convert array of cookies to a single concatenated string for SL
    const rawCookies = response.headers["set-cookie"];
    if (Array.isArray(rawCookies)) {
      cookie = rawCookies.map(c => c.split(';')[0]).join('; ');
    } else {
      cookie = rawCookies;
    }

    console.log("cookie: " + cookie);
    //console.log("response.headers: "+ JSON.stringify(response.headers));
    console.log("response.data.SessionId: " + response.data.SessionId);
    /*if ((response.status == "200" || response.status == "201") && cookie !== null)
      return cookie;
    else*/
    return cookie;
  }
  catch (error) {
    console.log("openDBConnection - error:", error?.response?.data || error.message);
    // if(res) {
    //   res.status(500).send({ message: err.message })
    // }
    // else {
    throw error;
    // }
  }
}

/**
 * Sets the in-memory SL cache (called from login controller)
 */
const setSLCache = (cookie, loginTime) => {
  memorySlCookie = cookie;
  memorySlLoginTime = loginTime || new Date().toISOString();
  console.log("*** setSLCache - SL cookie cached in memory");
}

const invalidateSLCache = (req) => {
  memorySlCookie = null;
  memorySlLoginTime = null;
  if (req && req.session) {
    req.session.slCookie = null;
    req.session.slLoginTime = null;
  }
  console.log("*** invalidateSLCache - SL cookie cache cleared");
}

module.exports = { openDBConnection, openSLConnection, getSLConnection, setSLCache, invalidateSLCache };
