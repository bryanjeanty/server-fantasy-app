const pool = require("../../../databasePool.js");

class AccountTable {
  static storeAccount({ username, password }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO account(username, password)
                VALUES ($1, $2)`,
        [username, password],
        (error, response) => {
          if (error) reject("error", error);

          resolve();
        }
      );
    });
  }
}

module.exports = AccountTable;
