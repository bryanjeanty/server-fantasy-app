const DragonTable = require("../dragon/table.js");

const NEW = (req, res) => {
  const dragon = req.app.locals.engine.generation.newDragon();

  DragonTable.storeDragon(dragon)
    .then(({ dragonId }) => {
      console.log("dragonId", dragonId);

      dragon.dragonId = dragonId;

      res.json({ dragon });
    })
    .catch(error => console.error(error));
};

module.exports = NEW;
