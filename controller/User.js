const { User } = require("../model/User");

// create a function to password from response object
const removePassword = (user) => {
  const { password, ...rest } = user._doc;
  return rest;
};

exports.fetchUserById = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.id // no need to fetch user id from query, now we have req.user which gives us user id and role provided by deserializer
    ).exec();
    res.status(200).json(removePassword(user));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    res.status(200).json(removePassword(user));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
