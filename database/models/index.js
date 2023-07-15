/* eslint-disable global-require */
const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const envConfigs = require("../config/config");

const basename = path.basename(__filename);
require("dotenv").config();
// console.log(process.env);
const env = process.env.NODE_ENV || "test";
const config = envConfigs[env];
// console.error('>>>>>config', config);
// console.error('>>>>>>> config url', config.url);

const db = {};

let sequelize;
if (config.url) {
  console.error("In if statement", config.url);
  sequelize = new Sequelize(config.url, config);
} else {
  console.error("IN else");
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// console.error('>>>>>>> sequelize', sequelize);

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);

    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

process.on("uncaughtException", function (err) {
  // Handle the error safely
  console.log(err);
});

// sequelize.sync({ force: true });
sequelize.sync({ alter: true });
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// console.error('>>>>>>> db', db);

module.exports = db;
