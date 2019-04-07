const DragonTable = require("../models/dragon/table.js");
const DragonAccountTable = require("../models/dragonAccount/table.js");
const { authenticatedAccount } = require("./helper");

const NEW = (req, res, next) => {
  let accountId, dragon;

  authenticatedAccount({
    sessionString: req.cookies.sessionString
  })
    .then(({ account }) => {
      accountId = account.id;

      dragon = req.app.locals.engine.generation.newDragon();

      return DragonTable.storeDragon(dragon);
    })
    .then(({ dragonId }) => {
      dragon.dragonId = dragonId;

      return DragonAccountTable.storeDragonAccount({ accountId, dragonId });
    })
    .then(() => res.json({ dragon }))
    .catch(error => next(error));
};

const UPDATE = (req, res, next) => {
  const { nickname, dragonId } = req.body;

  DragonTable.updateDragon({ nickname, dragonId })
    .then(() => res.json({ message: "successfully updated dragon" }))
    .catch(error => next(error));
};

module.exports = { NEW, UPDATE };
