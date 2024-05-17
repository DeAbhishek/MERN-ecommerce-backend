const { User } = require("../model/User");

const bcrypt = require("bcrypt");

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
  try {
    const user = await User.findOne({ email: req.body.email });

    !user
      ? res.status(404).json({ message: "Invalid email" })
      : (await bcrypt.compare(req.body.password, user.password))
      ? res.status(200).json({
          id: user.id,
          role: user.role,
          message: "Login successful",
        })
      : res.status(400).json({ message: "Invalid email or password" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
