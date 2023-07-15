const redis = require("redis");
const { promisify } = require("util");
const logger = require("../helpers/logger");

// Redis connection
const redisClient = redis.createClient();

redisClient.on("error", (error) => {
  logger.error("Redis connection error:", error);
});

// Promisify Redis client functions
const redisSetAsync = promisify(redisClient.set).bind(redisClient);
const redisGetAsync = promisify(redisClient.get).bind(redisClient);

// Global variables to store system state
let ordersNumber = 0;
let lastOrder = null;
let collectivePrice = 0;

// Function to run in a separate thread for the snapshot engine
const snapshotEngine = async () => {
  try {
    // Store the current state in Redis
    await redisClient.connect();
    await redisSetAsync("orders_number", ordersNumber);
    await redisSetAsync("last_order", JSON.stringify(lastOrder));
    await redisSetAsync("collective_price", collectivePrice);
  } catch (error) {
    logger.error("Snapshot engine error:", error);
  } finally {
    // Schedule the next snapshot after 1 second
    setTimeout(snapshotEngine, 1000);
  }
};

// Function to restore system state from Redis on startup
const restoreStateFromSnapshot = async () => {
  try {
    // Retrieve the stored values from Redis
    ordersNumber = parseInt(await redisGetAsync("orders_number")) || 0;
    lastOrder = JSON.parse(await redisGetAsync("last_order"));
    collectivePrice = parseFloat(await redisGetAsync("collective_price")) || 0;
  } catch (error) {
    logger.error("Restore state from snapshot error:", error);
  }
};

module.exports = { snapshotEngine, restoreStateFromSnapshot };
