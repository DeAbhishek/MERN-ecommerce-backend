const { createUser, loginUser } = require("../controller/Auth");
const passport = require('passport');
const router = require("express").Router();

router
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser);

module.exports = router;
