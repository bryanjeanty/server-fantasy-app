const { Router } = require("express");
const { REGISTRATION, SESSION } = require("../controllers/account.js");

const router = new Router();

router.post("/signup", REGISTRATION);
router.post("/login", SESSION);

module.exports = router;
