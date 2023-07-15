const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/database');

const OrderBook = sequelize.define('OrderBook', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  side: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = OrderBook;
