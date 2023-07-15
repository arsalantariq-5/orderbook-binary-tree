const express = require('express');
const orderController = require('./controllers/orderController');

const app = express();
app.use(express.json());

app.post('/orders', orderController.storeOrder);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
});
