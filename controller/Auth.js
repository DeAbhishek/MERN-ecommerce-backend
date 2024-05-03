const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    !user
      ? res.status(404).json({ message: "Invalid email" })
      : user.password === req.body.password
      ? res.status(200).json({
          id: user.id,
          email: user.email,
          name: user.name,
          role:user.role,
          message: "Login successful",
        })
      : res.status(400).json({ message: "Invalid email or password" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
