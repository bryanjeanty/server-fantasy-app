const { Router } = require("express");
const { NEW, UPDATE } = require("../controllers/dragon.js");

const router = new Router();

router.get("/new", NEW);
router.put("/update", UPDATE);

module.exports = router;
