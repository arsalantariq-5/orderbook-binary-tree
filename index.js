const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const orderController = require("./controllers/orderController");
const path = require("path");
const { snapshotEngine, restoreStateFromSnapshot } = require("./redis/redis");
const logger = require("./helpers/logger");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Start the snapshot engine thread
snapshotEngine();

// Restore system state from the snapshot
restoreStateFromSnapshot();

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Pass the 'io' object to the orderController
app.post("/orders", (req, res) => {
  orderController.storeOrder(req, res, io);
});

// Socket.io connection event
io.on("connection", (socket) => {
  logger.info("Client connected to socket:", socket.id);

  // Handle socket disconnection
  socket.on("disconnect", () => {
    logger.info("Client disconnected from socket:", socket.id);
  });
});

// Start the Express server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`API server is running on port ${PORT}`);
});
