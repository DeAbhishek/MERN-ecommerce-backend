const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.fetchAllProducts = async (req, res) => {
  let query = Product.findOne({});

  if (req.query.category) {
    query = query.find({ category: req.query.category });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
  }
  if (req.query._sort && req.query._order) {
    query = query.find({ [req.query._sort]: req.query._order });
  }
  if (req.query.page && req.query.limit) {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    query = query.skip(limit * (page - 1)).limit(page);
  }
  try {
    const docs = await query.exec();
    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
