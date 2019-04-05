const AccountTable = require("../models/account/table.js");
const { hash } = require("../models/account/helper.js");
const Session = require("../models/account/session.js");

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
      const session = new Session({ username });
      const sessionString = session.toString();

      res.cookie("sessionString", sessionString, {
        expire: Date.now() + 3600000,
        httpOnly: true
        // secure: true // Should be used with https (extremely important for production ready projects)
      });

      res.json({ message: "success!" });
    })
    .catch(error => next(error));
};

module.exports = {
  CREATE
};
