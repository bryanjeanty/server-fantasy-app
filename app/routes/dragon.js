const { Router } = require("express");
const { NEW, UPDATE, LIST, BUY } = require("../controllers/dragon.js");

const router = new Router();

router.get("/new", NEW);
router.put("/update", UPDATE);
router.get("/public-dragons", LIST);
router.post("/buy", BUY);

module.exports = router;
