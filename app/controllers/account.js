const AccountTable = require("../models/account/table.js");
const Session = require("../models/account/session.js");
const DragonAccountTable = require("../models/dragonAccount/table");
const { hash } = require("../models/account/helper.js");
const { setSession, authenticatedAccount } = require("./helper.js");
const { getDragonWithTraits } = require("../models/dragon/helper");

const REGISTRATION = (req, res, next) => {
  const { username, password } = req.body;
  const usernameHash = hash(username);
  const passwordHash = hash(password);

  AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
      if (!account) {
        return AccountTable.storeAccount({ usernameHash, passwordHash });
      } else {
        const error = new Error("This username has already been taken");

        error.statusCode = 409;

        throw error;
      }
    })
    .then(() => {
      return setSession({ username, res });
    })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch(error => next(error));
};

const SESSION = (req, res, next) => {
  const { username, password } = req.body;

  AccountTable.getAccount({ usernameHash: hash(username) })
    .then(({ account }) => {
      if (account && account.passwordHash === hash(password)) {
        const { sessionId } = account;

        return setSession({ username, res, sessionId });
      } else {
        const error = new Error("Incorrect username/password");

        error.statusCode = 409;

        throw error;
      }
    })
    .then(({ message }) => res.json({ message }))
    .catch(error => next(error));
};

const LOGOUT = (req, res, next) => {
  const { username } = Session.parse(req.cookies.sessionString);

  AccountTable.updateSessionId({
    sessionId: null,
    usernameHash: hash(username)
  })
    .then(() => {
      res.clearCookie("sessionString");

      res.json({ message: "Successful logout!" });
    })
    .catch(error => next(error));
};

const AUTHENTICATED = (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ authenticated }) => res.json({ authenticated }))
    .catch(error => next(error));
};

const DRAGON_LIST = (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      return DragonAccountTable.getAccountDragons({
        accountId: account.id
      });
    })
    .then(({ accountDragons }) => {
      return Promise.all(
        accountDragons.map(accountDragon => {
          return getDragonWithTraits({ dragonId: accountDragon.dragonId });
        })
      );
    })
    .then(dragons => {
      res.json({ dragons });
    })
    .catch(error => next(error));
};

const INFO = (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account, username }) => {
      res.json({ info: { balance: account.balance, username } });
    })
    .catch(error => next(error));
};

module.exports = {
  REGISTRATION,
  SESSION,
  LOGOUT,
  AUTHENTICATED,
  DRAGON_LIST,
  INFO
};
