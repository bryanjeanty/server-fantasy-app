const DragonTable = require("../models/dragon/table.js");

// Get Functions
const LIST = (req, res) => {};
const NEW = (req, res, next) => {
  const dragon = req.app.locals.engine.generation.newDragon();

  DragonTable.storeDragon(dragon)
    .then(({ dragonId }) => {
      console.log("dragonId", dragonId);

      dragon.dragonId = dragonId;

      res.json({ dragon });
    })
    .catch(error => next(error));
};
const ITEM = (req, res) => {};
const EDIT = (req, res) => {};

// Post Function
const CREATE = (req, res) => {};

// Put Function
const UPDATE = (req, res) => {};

// Delete Function
const DELETE = (req, res) => {};

// Helper Function(s)

module.exports = {
  LIST,
  NEW,
  ITEM,
  EDIT,
  CREATE,
  UPDATE,
  DELETE
};
