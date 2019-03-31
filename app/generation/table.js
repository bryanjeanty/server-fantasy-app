const pool = require("../../databasePool.js");

class GenerationTable {
  // By making the method below static, we can use
  // it without instatiating the class
  static storeGeneration(generation) {
    pool.query(
      "INSERT INTO generation(expiration) VALUES($1)",
      [generation.expiration],
      (error, response) => {
        if (error) return console.error(error);
      }
    );
  }
}

module.exports = GenerationTable;
