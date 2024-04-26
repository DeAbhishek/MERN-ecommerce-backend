const { Brand } = require("../model/Brand");

exports.createBrand = async (req, res) => {
  const brand = new Brand(req.body);
  try {
    await brand.save();
    res.status(201).json(brand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.fetchBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
