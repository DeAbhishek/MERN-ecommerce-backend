const { createBrand, fetchBrands } = require("../controller/Brand");

const router = require("express").Router();

router.post("/", createBrand).get("/", fetchBrands);

module.exports = router;
