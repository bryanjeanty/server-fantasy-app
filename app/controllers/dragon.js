const DragonTable = require("../models/dragon/table.js");

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

module.exports = NEW;
