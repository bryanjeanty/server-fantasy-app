const { Router } = require("express");
const {
  REGISTRATION,
  SESSION,
  LOGOUT,
  AUTHENTICATED,
  DRAGON_LIST
} = require("../controllers/account.js");

const router = new Router();

router.post("/signup", REGISTRATION);
router.post("/login", SESSION);
router.get("/logout", LOGOUT);
router.get("/authenticated", AUTHENTICATED);
router.get("/dragons", DRAGON_LIST);

module.exports = router;
