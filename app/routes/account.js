const { Router } = require("express");
const { CREATE } = require("../controllers/account.js");

const router = new Router();

router.post("/signup", CREATE);

module.exports = router;
