require("dotenv").config();
const { User } = require("../model/User");
const bcrypt = require("bcrypt");
const { sanitizeUser } = require("../services/common");

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

          req.login(sanitizeUser(doc), function (err) {
            if (err) res.status(400).json({ message: err.message });
            else {
              res.status(201).json(sanitizeUser(doc));
            }
          });
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
