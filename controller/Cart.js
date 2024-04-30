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
    const doc = await cart.save();
    const result = await doc.populate("product");
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFromCart = async (req, res) => {
  try {
    const doc = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCart = async (req,res)=>{
  try {
    const doc = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
