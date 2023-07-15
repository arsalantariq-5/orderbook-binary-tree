// controller.js

const OrderBook = require("../models/OrderBook");
const BinaryTree = require("../helpers/binaryTree");
const constants = require("../helpers/constants");
const logger = require("../helpers/logger");

let tree = new BinaryTree(); // Define the binary tree variable

const storeOrder = async (req, res, io) => {
  const { orders } = req.body;

  try {
    // Create the binary tree
    if (!tree.root) {
      await createBinaryTree();
    }

    // Check for matching transactions
    for (const order of orders) {
      const { side, price } = order;
      const createdOrder = await OrderBook.create({ side, price });
      const orderId = createdOrder.id;
      const oppositeSide = order.side === "buy" ? "sell" : "buy";
      const similarOrder = tree.findBySide(oppositeSide, order.price);
      if (similarOrder.length === 0) {
        tree.add({ id: orderId, side, price });
      } else {
        await OrderBook.destroy({ where: { id: orderId } });
        tree.delete({ id: orderId, side: order.side, price: order.price });
      }

      // Emit a transaction update to all connected clients
      io.emit("transactionUpdate", { message: "Transaction processed", order });
    }

    // Fetch the updated orders from the database and log them
    const fetchResult = await OrderBook.findAll();
    logger.info("Current Orders:", fetchResult);
    res.json({ message: "Orders stored successfully", fetchResult });
  } catch (err) {
    const errorMessage = "Error storing orders";
    logger.error(`${errorMessage}: ${err}`);
    res.status(500).json({ error: constants.ERROR_STORE_ORDER });
  }
};

const createBinaryTree = async () => {
  // Fetch all existing orders from the database
  const existingOrders = await OrderBook.findAll();

  // Create a new binary tree and add existing orders to it
  tree = new BinaryTree();
  for (const order of existingOrders) {
    const { id, side, price } = order;
    tree.add({ id, side, price });
  }

  logger.info("Binary tree created successfully");
};

module.exports = { storeOrder, createBinaryTree };
