const { Router } = require("express");
const {
  LIST,
  NEW,
  ITEM,
  EDIT,
  CREATE,
  UPDATE,
  DELETE
} = require("../controllers/dragon.js");

const router = new Router();

// Get Routes
router.get("/new", NEW);

// Post Route

// Put Route

// Delete Route

module.exports = router;
