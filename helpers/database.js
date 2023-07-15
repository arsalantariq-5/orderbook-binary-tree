// const mysql = require('mysql');
// const logger = require('../helpers/logger');
// require('dotenv').config();

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
// });

// connection.connect(err => {
//   if (err) {
//     logger.error('Error connecting to the database:', err);
//     return;
//   }
//   logger.info('Connected to the database');

//   // Check if the order_book table exists
//   const tableCheckQuery = `SHOW TABLES LIKE 'order_book'`;
//   connection.query(tableCheckQuery, (err, results) => {
//     if (err) {
//       logger.error('Error checking table existence:', err);
//       return;
//     }

//     if (results.length === 0) {
//       // Table does not exist, create it
//       const createTableQuery = `CREATE TABLE order_book (
//         id INT NOT NULL AUTO_INCREMENT,
//         side ENUM('buy', 'sell') NULL,
//         price DECIMAL(10, 2) NOT NULL,
//         PRIMARY KEY (id)
//       )`;

//       connection.query(createTableQuery, err => {
//         if (err) {
//           logger.error('Error creating table:', err);
//         } else {
//           logger.info('Table order_book created successfully');
//         }
//       });
//     }
//   });
// });

// module.exports = connection;


const { Sequelize } = require('sequelize');
const logger = require('../helpers/logger');
require('dotenv').config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: 'mysql'
});

// Test the database connection
(async () => {
    try {
      await sequelize.sync(); // Synchronize the models with the database
      console.log('Models synchronized with the database');
    } catch (error) {
      console.error('Unable to synchronize models with the database:', error);
    }
  })();

module.exports = sequelize;

