const { Router } = require("express");
const { REGISTRATION, SESSION, LOGOUT } = require("../controllers/account.js");

const router = new Router();

router.post("/signup", REGISTRATION);
router.post("/login", SESSION);
router.get("/logout", LOGOUT);

module.exports = router;
