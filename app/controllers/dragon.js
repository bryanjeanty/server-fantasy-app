const DragonTable = require("../models/dragon/table.js");
const DragonAccountTable = require("../models/dragonAccount/table.js");
const { authenticatedAccount } = require("./helper");
const { getPublicDragons } = require("../models/dragon/helper");
const AccountTable = require("../models/account/table");

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

const BUY = (req, res, next) => {
  const { dragonId, saleValue } = req.body;
  let buyerId;

  DragonTable.getDragon({ dragonId })
    .then(dragon => {
      if (dragon.saleValue !== saleValue) {
        throw new Error("Sale value is not correct");
      }

      if (!dragon.isPublic) {
        throw new Error("Dragon must be public");
      }

      return authenticatedAccount({ sessionString: req.cookies.sessionString });
    })
    .then(({ account, authenticated }) => {
      if (!authenticated) {
        throw new "Unauthenticated"();
      }

      if (saleValue > account.balance) {
        throw new "Sale value exceeds balance"();
      }

      buyerId = account.id;

      return DragonAccountTable.getDragonAccount({ dragonId });
    })
    .then(({ accountId }) => {
      if (accountId === buyerId) {
        throw new Error("Cannot buy your own dragon!");
      }

      const sellerId = accountId;

      return Promise.all([
        AccountTable.updateBalance({
          accountId: buyerId,
          value: -saleValue
        }),
        AccountTable.updateBalance({
          accountId: sellerId,
          value: saleValue
        }),
        DragonAccountTable.updateDragonAccount({
          dragonId,
          accountId: buyerId
        }),
        DragonTable.updateDragon({
          dragonId,
          isPublic: false
        })
      ]);
    })
    .then(() => res.json({ message: "success" }))
    .catch(error => next(error));
};

module.exports = { NEW, UPDATE, LIST, BUY };
