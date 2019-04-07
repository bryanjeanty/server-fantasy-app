const pool = require("../../../databasePool.js");
const DragonTable = require("./table.js");
const Dragon = require("../dragon/index.js");

const getDragonWithTraits = ({ dragonId }) => {
  return Promise.all([
    DragonTable.getDragon({ dragonId }),
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT "traitType", "traitValue"
            FROM trait
            INNER JOIN dragonTrait
            ON trait.id = dragonTrait."traitId"
            WHERE dragonTrait."dragonId" = $1`,
        [dragonId],
        (error, response) => {
          if (error) return reject(error);

          resolve(response.rows);
        }
      );
    })
  ])
    .then(([dragon, dragonTraits]) => {
      return new Dragon({ ...dragon, dragonId, traits: dragonTraits });
    })
    .catch(error => console.error(error));
};

// Just for debugging
// getDragonWithTraits({ dragonId: 1 })
//   .then(dragon => console.log("dragon", dragon))
//   .catch(error => console.error("error", error));

module.exports = { getDragonWithTraits };
