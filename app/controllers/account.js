const AccountTable = require("../models/account/table.js");
const Session = require("../models/account/session.js");
const { hash } = require("../models/account/helper.js");
const { setSession } = require("./helper.js");

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

const AUTHENTICATE = (req, res, next) => {
  const { sessionString } = req.cookies;

  if (!sessionString || !Session.verify(sessionString)) {
    const error = new Error("Invalid session");

    error.statusCode = 400;

    return next(error);
  } else {
    const { username, id } = Session.parse(sessionString);

    AccountTable.getAccount({ usernameHash: hash(username) })
      .then(({ account }) => {
        const authenticated = account.sessionId === id;

        res.json({ authenticated });
      })
      .catch(error => next(error));
  }
};

module.exports = {
  REGISTRATION,
  SESSION,
  LOGOUT,
  AUTHENTICATE
};
