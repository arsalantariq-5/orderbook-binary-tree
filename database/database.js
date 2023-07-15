const { Sequelize } = require("sequelize");
const logger = require("../helpers/logger");
require("dotenv").config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: "mysql",
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    logger.info("Connected to the database");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
