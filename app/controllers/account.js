const AccountTable = require("../models/account/table.js");
const { hash } = require("../models/account/helper.js");
const { setSession } = require("./helper.js");

const CREATE = (req, res, next) => {
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

module.exports = {
  CREATE
};
