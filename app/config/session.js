const session = require("express-session");
const connectRedis = require("connect-redis");
const fileStore = require("session-file-store");
const { sessionStoreTypes, sessionStore, cookieName,
  sessionSecret, sessionMaxAgeInHours } = require("../config/config");
const { redisClient } = require("../services/redis.js");

let store = "";
if(sessionStore === sessionStoreTypes.REDIS) {
  const RedisStore = connectRedis(session);
  store = new RedisStore({ client: redisClient });
}
else if (sessionStore === sessionStoreTypes.FILE) {
  const FileStore = fileStore(session);
  store = new FileStore({
    ttl: 60 * 60 * parseInt(sessionMaxAgeInHours), //Session Time-to-Live in Seconds
    // BUG FIX: Windows-specific settings to prevent EPERM errors on rename/locking
    retries: 10,        // increased from 5 → 10 retries
    factor: 1,
    minTimeout: 100,    // increased from 50ms → 100ms
    maxTimeout: 500,    // increased from 100ms → 500ms
    reapInterval: 3600, // clean up expired sessions every 1 hour
    logFn: (msg) => {
      if (msg && msg.toLowerCase().includes('error')) {
        console.error('[SESSION STORE ERROR]', msg);
      }
    }
    // secret: sessionSecret //to encrypt/hash the contents in the Session file
  });
}

const isHttps = process.env.HTTPS === "true";

const expressSession = session({
  store,
  name: cookieName, //Name of the cookie that stores the sessionID in the Browser. Default value: `connect.sid`
  secret: sessionSecret, //Key to `sign` the cookie (hash the sessionID) before sending it to FE via above cookie
  resave: false, //`true` forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: false,
  rolling: true, // Enable "rolling" sessions, i.e., Session expiry will be reset on every request
  cookie: {
    //`secure` attribute must be true, when `SameSite=None`
    secure: isHttps, // if true only transmit cookie over https
    sameSite: isHttps ? "none" : "lax",
    httpOnly: true, // `true` prevents client side JS from reading the cookie 
    maxAge: 1000 * 60 * 60 * parseInt(sessionMaxAgeInHours) //Session Max Age in Miliseconds
  }
});

module.exports = expressSession;