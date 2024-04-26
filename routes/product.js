const {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProductById,
} = require("../controller/Product");
const express = require("express");
const router = express.Router();

router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProductById)

module.exports = router;
