const { Router } = require("express");
const { NEW, UPDATE, LIST } = require("../controllers/dragon.js");

const router = new Router();

router.get("/new", NEW);
router.put("/update", UPDATE);
router.get("/public-dragons", LIST);

module.exports = router;
