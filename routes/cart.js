const { addToCart, fetchCartByUser } = require("../controller/Cart");

const router = require("express").Router();

router.post("/", addToCart).get("/", fetchCartByUser);

module.exports = router;
