const { createProduct, fetchAllProducts } = require("../controller/Product");
const express = require("express");
const router = express.Router();

router.post("/", createProduct).get("/", fetchAllProducts);

module.exports = router;
