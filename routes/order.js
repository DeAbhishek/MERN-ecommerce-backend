const {
  fetchOrderByUser,
  createOrder,
  deleteOrder,
  updateOrder,
  fetchAllOrders,
} = require("../controller/Order");

const router = require("express").Router();

router
  .get("/", fetchAllOrders)
  .get("/user/:userId", fetchOrderByUser)
  .post("/", createOrder)
  .delete("/:id", deleteOrder)
  .patch("/:id", updateOrder);

module.exports = router;
