// Import the redis package (v4 - uses async/promise API)
const redis = require("redis");

// Create a Redis client (redis v4 syntax)
const redisClient = redis.createClient({
  socket: {
    host: "localhost",
    port: 6379,
  }
});

redisClient.on("connect", function () {
  console.log("Connected to Redis successfully");
});

redisClient.on("error", (error) => {
  console.error("Redis connection error:", error);
});

// Connect to Redis (required in redis v4)
redisClient.connect().catch((err) => {
  console.error("Redis initial connect failed:", err);
});

// Set a value in Redis
const setValue = async (key, value) => {
  try {
    await redisClient.set(key, value);
    console.log("Value set in Redis:", key, value);
  } catch (error) {
    console.error("Error setting value in Redis:", error);
  }
};

// Get a value from Redis
const getValue = async (key) => {
  try {
    const value = await redisClient.get(key);
    console.log("Value retrieved from Redis:", key, value);
    return value;
  } catch (error) {
    console.error("Error getting value from Redis:", error);
    throw error;
  }
};

module.exports = { redisClient, setValue, getValue };
