const io = require("socket.io-client");
const logger = require("../helpers/logger");

// Connect to the socket server
const socket = io("http://localhost:3000");

// Event listener for the 'transactionUpdate' event
socket.on("transactionUpdate", (data) => {
  // Handle the transaction update
  logger.info("Transaction update:", data.message);
  logger.info("Updated order:", data.order);

  // Display the transaction update on the page
  const messageContainer = document.getElementById("message-container");
  const messageElement = document.createElement("p");
  messageElement.textContent = `Transaction update: ${
    data.message
  }, Order: ${JSON.stringify(data.order)}`;
  messageContainer.appendChild(messageElement);
});

// Event listener for the 'connect' event
socket.on("connect", () => {
  logger.info("Connected to socket server");
});

// Event listener for the 'disconnect' event
socket.on("disconnect", () => {
  logger.info("Disconnected from socket server");
});
