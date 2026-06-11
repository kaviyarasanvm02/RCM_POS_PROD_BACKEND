/**
 * POS Health Monitor
 * ------------------
 * Runs independently alongside the main server.
 * Checks HANA DB connectivity every 5 minutes via the /health endpoint.
 * 
 * Start with: node monitor.js
 */
require("dotenv").config();
const http = require("http");
const https = require("https");

const PORT = 7500;           // Live server port
const HOST = "172.18.20.103"; // Live server IP
const PROTOCOL = https;        // Live server uses HTTPS
const CHECK_INTERVAL_MS = 5 * 60 * 1000; // every 5 minutes

let consecutiveFailures = 0;

const formatTime = () => new Date().toLocaleString("en-FJ", { timeZone: "Pacific/Fiji" });

const checkHealth = () => {
  const options = {
    hostname: HOST,
    port: PORT,
    path: "/health",
    method: "GET",
    timeout: 10000, // 10 second timeout
    rejectUnauthorized: false // allow self-signed certs
  };

  const req = PROTOCOL.request(options, (res) => {
    let data = "";
    res.on("data", (chunk) => data += chunk);
    res.on("end", () => {
      try {
        const body = JSON.parse(data);
        if (res.statusCode === 200) {
          consecutiveFailures = 0;
          console.log(`✅ [${formatTime()}] HANA DB OK - Host: ${body.host}:${body.port}`);
        } else {
          consecutiveFailures++;
          console.error(`🔴 [${formatTime()}] HANA DB DOWN (Attempt #${consecutiveFailures}) - ${body.message}`);
          console.error(`   ➜ Check SAP HANA server at ${process.env.HANA_HOST}:${process.env.HANA_PORT}`);
        }
      } catch (e) {
        consecutiveFailures++;
        console.error(`🔴 [${formatTime()}] Health check response parse error (Attempt #${consecutiveFailures})`);
      }
    });
  });

  req.on("timeout", () => {
    consecutiveFailures++;
    console.error(`🔴 [${formatTime()}] Health check TIMED OUT - POS Node server may be down! (Attempt #${consecutiveFailures})`);
    req.destroy();
  });

  req.on("error", (err) => {
    consecutiveFailures++;
    if (err.code === "ECONNREFUSED") {
      console.error(`🔴 [${formatTime()}] POS NODE SERVER IS DOWN - Connection refused on port ${PORT} (Attempt #${consecutiveFailures})`);
    } else {
      console.error(`🔴 [${formatTime()}] Health check error: ${err.message} (Attempt #${consecutiveFailures})`);
    }
  });

  req.end();
};

console.log(`\n🟡 POS Health Monitor started at ${formatTime()}`);
console.log(`   Monitoring: http://${HOST}:${PORT}/health`);
console.log(`   Check interval: every 5 minutes\n`);

// Run immediately, then repeat every 5 minutes
checkHealth();
setInterval(checkHealth, CHECK_INTERVAL_MS);
