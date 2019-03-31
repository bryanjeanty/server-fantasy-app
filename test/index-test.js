// Test 1

const Dragon = require("./dragon.js");

// Since we have changed the dragon class to take an
// object as an input, we no longer have to worry
// about the order in which we input parameters.

// Not to mention, now it is a lot more clear as to
// what the arguments are of each class instantiation.
const fooey = new Dragon({
  birthdate: new Date(),
  nickname: "fooey"
});
const baloo = new Dragon({
  nickname: "baloo",
  birthdate: new Date()
});

const mimar = new Dragon();

// We're setting the creation of the gooby dragon
// instantiation at a later time, in order to test
// whether its birthdate will actually take place
// at a later time
setTimeout(() => {
  const gooby = new Dragon();
  console.log("gooby", gooby);
}, 3000);

console.log("fooey", fooey);
console.log("baloo", baloo);
console.log("mimar", mimar);

// Test 2

const Generation = require("./generation.js");

const generation = new Generation();

console.log("generation", generation);

const gooby = generation.newDragon();

console.log("gooby", gooby);

setTimeout(() => {
  const mimar = generation.newDragon();
  console.log("mimar", mimar);
}, 15000);
