const { Router } = require("express");
const {
  REGISTRATION,
  SESSION,
  LOGOUT,
  AUTHENTICATE
} = require("../controllers/account.js");

const router = new Router();

router.post("/signup", REGISTRATION);
router.post("/login", SESSION);
router.get("/logout", LOGOUT);
router.get("/authenticated", AUTHENTICATE);

module.exports = router;
