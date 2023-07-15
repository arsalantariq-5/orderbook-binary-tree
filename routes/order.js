const express = require("express");
const router = express.Router();
const db = require("../lib/database.js");

router.get("/", (req, res, next) => {
    console.log("IN get router")
  res.status(200).send("user");
});

module.exports = router;