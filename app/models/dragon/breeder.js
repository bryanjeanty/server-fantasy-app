const Dragon = require("./index");
const base64 = require("base-64");

class Breeder {
  static breedDragon({ matron, patron }) {
    const matronTraits = matron.traits;
    const patronTraits = patron.traits;

    const babyTraits = [];

    matronTraits.forEach(({ traitType, traitValue }) => {
      const matronTrait = traitValue;

      const patronTrait = patronTraits.find(
        trait => trait.traitType === traitType
      ).traitValue;

      babyTraits.push({
        traitType,
        traitValue: Breeder.pickTrait({ matronTrait, patronTrait })
      });
    });

    return new Dragon({ nickname: "unnamed baby", traits: babyTraits });
  }

  // Two incoming traits: matronTrait & patronTrait
  // The matron & patron trait string values are encoded
  // Both traits will have their characters summed
  // We'll get a range by adding both character sums
  // Generate a random number, in that range
  // If the number is less than the matron's character sum, pick matron
  // Else, pick patron
  static pickTrait({ matronTrait, patronTrait }) {
    if (matronTrait === patronTrait) return matronTrait;

    const matronTraitCharSum = Breeder.charSum(base64.encode(matronTrait));
    const patronTraitCharSum = Breeder.charSum(base64.encode(patronTrait));

    const randNum = Math.floor(
      Math.random() * (matronTraitCharSum + patronTraitCharSum)
    );

    return randNum < matronTraitCharSum ? matronTrait : patronTrait;
  }

  static charSum(string) {
    return string
      .split("")
      .reduce((sum, character) => (sum += character.charCodeAt()), 0);
  }
}

const fooby = new Dragon();
const gooby = new Dragon();

console.log("fooby", fooby);
console.log("gooby", gooby);

const foogooby = Breeder.breedDragon({ matron: fooby, patron: gooby });
console.log("foogooby", foogooby);

module.exports = Breeder;
