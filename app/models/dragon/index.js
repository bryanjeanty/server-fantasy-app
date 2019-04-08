const TRAITS = require("../../../data/traits.json");

// The default_properties object contains all
// the global variables that don't change throughout
// the lifetime of an application.

const DEFAULT_PROPERTIES = {
  dragonId: undefined,
  nickname: "unnamed",
  isPublic: false,
  saleValue: 0,
  generationId: undefined,
  // We're changing the key-value pair
  // below to a getter pattern
  // birthdate: new Date()

  // The beauty of using a getter pattern, is
  // whenever we call birthdate, it's going to
  // compute the date of instantiation for the
  // given object as opposed to calculating the
  // date when the file was executed
  get birthdate() {
    return new Date();
  },

  get randomTraits() {
    const traits = [];

    TRAITS.forEach(TRAIT => {
      const traitType = TRAIT.type;
      const traitValues = TRAIT.values;

      const traitValue =
        traitValues[Math.floor(Math.random() * traitValues.length)];

      traits.push({ traitType, traitValue });
    });

    return traits;
  }
};

class Dragon {
  constructor({
    dragonId,
    birthdate,
    nickname,
    traits,
    generationId,
    isPublic,
    saleValue
  } = {}) {
    this.dragonId = dragonId || DEFAULT_PROPERTIES.dragonId;
    this.birthdate = birthdate || DEFAULT_PROPERTIES.birthdate;
    this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
    this.traits = traits || DEFAULT_PROPERTIES.randomTraits;
    this.generationId = generationId || DEFAULT_PROPERTIES.generationId;
    this.isPublic = isPublic || DEFAULT_PROPERTIES.isPublic;
    this.saleValue = saleValue || DEFAULT_PROPERTIES.saleValue;
  }
}

module.exports = Dragon;
