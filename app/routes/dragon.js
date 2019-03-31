const { Router } = require("express");
const NEW = require("../controllers/dragon.js");

const router = new Router();

// Get Routes
router.get("/", INDEX);
router.get("/new", NEW);
router.get("/:id", SHOW);
router.get("/:id/edit", EDIT);

// Post Routes
router.post("/", CREATE);

// Put Routes
router.put("/:id", UPDATE);

// Delete Routes
router.delete("/:id", DESTROY);

module.exports = router;
