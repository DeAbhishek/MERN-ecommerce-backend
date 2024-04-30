const {
  addToCart,
  fetchCartByUser,
  deleteFromCart,
  updateCart,
} = require("../controller/Cart");

const router = require("express").Router();

router
  .post("/", addToCart)
  .get("/", fetchCartByUser)
  .delete("/:id", deleteFromCart)
  .patch("/:id", updateCart);

module.exports = router;
