const { Router } = require("express");
const {
  LIST,
  NEW,
  ITEM,
  EDIT,
  CREATE,
  UPDATE,
  DELETE
} = require("../controllers/generation.js");

const router = new Router();

router.get("/", LIST);

module.exports = router;
