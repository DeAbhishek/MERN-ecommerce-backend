const { Category } = require("../model/Category");

exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.fetchCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
}