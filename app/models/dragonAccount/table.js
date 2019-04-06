const pool = require("../../../databasePool");

class DragonAccountTable {
  static storeDragonAccount({ accountId, dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO dragonAccount("accountId", "dragonId")
        VALUES($1, $2)`,
        [accountId, dragonId],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }
}

module.exports = DragonAccountTable;
