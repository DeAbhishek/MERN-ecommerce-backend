const {
  fetchOrderByUser,
  createOrder,
  deleteOrder,
  updateOrder,
} = require("../controller/Order");

const router = require("express").Router();

router
  .get("/", fetchOrderByUser)
  .post("/", createOrder)
  .delete("/:id", deleteOrder)
  .patch("/:id", updateOrder);

module.exports = router;
