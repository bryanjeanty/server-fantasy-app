const { Router } = require("express");
const INDEX = require("../controllers/generation.js");

const router = new Router();

router.get("/", INDEX);

module.exports = router;
