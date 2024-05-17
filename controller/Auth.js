require("dotenv").config();
const { User } = require("../model/User");
const bcrypt = require("bcrypt");

exports.createUser = (req, res) => {
  const newUserData = { ...req.body };
  bcrypt.hash(
    req.body.password,
    Number(process.env.SALT_ROUNDS),
    async function (err, hash) {
      if (err) {
        res.status(400).json({ message: err.message });
        return;
      } else {
        newUserData.password = hash;
        try {
          const doc = await User.create(newUserData);
          res.status(201).json({ id: doc.id, role: doc.role });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }
    }
  );
};

exports.loginUser = async (req, res) => {
  res.json(req.user);
};

exports.checkUser = async (req, res) => {
  res.json(req.user);
};
