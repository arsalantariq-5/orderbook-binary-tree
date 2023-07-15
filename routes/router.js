const express = require("express");
const orderRouter = require("./order");

const router = express.Router();

router.use("/users", orderRouter);

module.exports = router;
