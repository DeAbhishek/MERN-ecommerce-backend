const { fetchUserById, updateUser } = require("../controller/User");

const router = require("express").Router();

router.get("/:id", fetchUserById).patch("/:id", updateUser);

module.exports = router;
