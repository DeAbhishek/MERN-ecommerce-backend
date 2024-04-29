const { createUser, loginUser } = require("../controller/Auth");


const router = require("express").Router();

router.post("/signup", createUser).post("/login", loginUser)

module.exports = router;
