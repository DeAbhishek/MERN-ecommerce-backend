const { createCategory, fetchCategories,  } = require("../controller/Category");

const router = require("express").Router();

router.post("/", createCategory).get("/", fetchCategories);

module.exports = router;
