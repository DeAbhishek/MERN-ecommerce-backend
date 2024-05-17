const { User } = require("../model/User");

// const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  newUserData.password = await bcrypt.hash(req.body.password, 10);

  try {
    const doc = await User.create(newUserData);
    res.status(201).json({ id: doc.id, role: doc.role });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  res.json(req.user);
};


