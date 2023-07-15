const net = require('net');

// Transaction matching logic
function matchTransaction(transaction) {
    // Check if the transaction matches the values 2, 3, or 4
    return ['2', '3', '4'].includes(transaction);
  }

// Create a TCP server
const server = net.createServer(socket => {
  console.log('Client connected:', socket.remoteAddress, socket.remotePort);

  // Receive data from the client
  socket.on('data', data => {
    const transactionData = data.toString().trim();

    // Check if the transaction matches
    if (matchTransaction(transactionData)) {
      // Send update to the client
      socket.write('Transaction matched!\n');
    }
  });

  // Handle client disconnection
  socket.on('end', () => {
    console.log('Client disconnected:', socket.remoteAddress, socket.remotePort);
  });
});

// Start the server
server.listen(9999, 'localhost', () => {
  console.log('Server started. Listening on port 9999...');
});
