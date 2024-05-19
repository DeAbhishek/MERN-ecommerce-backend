const { fetchUserById, updateUser } = require("../controller/User");

const router = require("express").Router();

router.get("/", fetchUserById).patch("/", updateUser);

module.exports = router;
