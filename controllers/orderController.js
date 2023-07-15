const OrderBook = require("../models/OrderBook");
const BinaryTree = require("../helpers/binaryTree");
const constants = require("../helpers/constants");
const logger = require("../helpers/logger");

const tree = new BinaryTree();

const storeOrder = async (req, res) => {
  const { side, price } = req.body;
  const oppositeSide = side === "buy" ? "sell" : "buy";

  try {
    const createdOrder = await OrderBook.create({ side, price });
    const orderId = createdOrder.id;

    tree.add({ id: orderId, side, price }); // Add the order to the binary tree
    logger.info(`Order with ID ${orderId} added to the binary tree`);
    logger.info(`Order stored successfully`);

    // Check for matching transactions
    const oppositeOrders = tree.find(oppositeSide);
    if (oppositeOrders.length > 0) {
      const oppositeIds = oppositeOrders.map((order) => order.id);
      await OrderBook.destroy({ where: { id: oppositeIds } });

      oppositeOrders.forEach((order) => {
        tree.delete({ id: order.id, side: oppositeSide, price: order.price });
        logger.info(
          `Order with ID ${order.id} deleted from the binary ${tree}`
        );
      });
      logger.info("Matching transactions deleted successfully");
    }
    // Fetch the updated orders from the database and log them
    const fetchResult = await OrderBook.findAll();
    logger.info("Current Orders:", fetchResult);
    res.json({ message: "Order stored successfully", fetchResult });
  } catch (err) {
    const errorMessage = "Error storing order";
    logger.error(`${errorMessage}: ${err}`);
    res.status(500).json({ error: constants.ERROR_STORE_ORDER });
  }
};

module.exports = { storeOrder };
