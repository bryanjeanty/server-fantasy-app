const { Router } = require("express");
const { NEW } = require("../controllers/dragon.js");

const router = new Router();

router.get("/new", NEW);

module.exports = router;
