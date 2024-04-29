const Cart = require("../model/Cart");

exports.fetchCartByUser = async (req, res) => {
  try {
    const carts = await Cart.find({ user: req.query.user })
      .populate("user")
      .populate("product");
    res.status(200).json(carts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  const cart = new Cart(req.body);
  try {
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
