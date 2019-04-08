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

  static getAccountDragons({ accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT "dragonId"
        FROM dragonAccount
        WHERE "accountId" = $1`,
        [accountId],
        (error, response) => {
          if (error) return reject(error);

          resolve({ accountDragons: response.rows });
        }
      );
    });
  }

  static getDragonAccount({ dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT "accountId"
        FROM dragonAccount
        WHERE "dragonId" = $1`,
        [dragonId],
        (error, response) => {
          if (error) return reject(error);

          resolve({ accountId: response.rows[0].accountId });
        }
      );
    });
  }

  static updateDragonAccount({ accountId, dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE dragonAccount
        SET "accountId" = $1
        WHERE "dragonId" = $2`,
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
