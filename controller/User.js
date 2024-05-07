const { User } = require("../model/User");

exports.fetchUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "id name email orders addresses role").exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
