const DragonTable = require("../models/dragon/table.js");
const DragonAccountTable = require("../models/dragonAccount/table.js");
const { authenticatedAccount } = require("./helper");
const { getPublicDragons } = require("../models/dragon/helper");

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
  const { nickname, dragonId, isPublic, saleValue } = req.body;

  DragonTable.updateDragon({ nickname, dragonId, isPublic, saleValue })
    .then(() => res.json({ message: "successfully updated dragon" }))
    .catch(error => next(error));
};

const LIST = (req, res, next) => {
  getPublicDragons()
    .then(({ dragons }) => res.json({ dragons }))
    .catch(error => next(error));
};

module.exports = { NEW, UPDATE, LIST };
