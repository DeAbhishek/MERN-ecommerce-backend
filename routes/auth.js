const { createUser, loginUser, checkUser } = require("../controller/Auth");
const passport = require("passport");
const router = require("express").Router();

router
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"), checkUser);

module.exports = router;
