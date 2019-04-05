const AccountTable = require("../models/account/table.js");

const CREATE = (req, res, next) => {
  const { username, password } = req.body;

  AccountTable.storeAccount({ username, password })
    .then(() => res.json({ message: "success!" }))
    .catch(error => console.error("error", error));
};

module.exports = {
  CREATE
};
