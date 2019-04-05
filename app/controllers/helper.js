const Session = require("../models/account/session");
const AccountTable = require("../models/account/table.js");
const { hash } = require("../models/account/helper.js");

const setSession = ({ username, res }) => {
  return new Promise((resolve, reject) => {
    const session = new Session({ username });
    const sessionString = session.toString();

    AccountTable.updateSessionId({
      sessionId: session.id,
      usernameHash: hash(username)
    })
      .then(() => {
        res.cookie("sessionString", sessionString, {
          expire: Date.now() + 3600000,
          httpOnly: true
          // secure: true // Should be used with https (extremely important for production ready projects)
        });

        resolve({ message: "session was created" });
      })
      .catch(error => reject(error));
  });
};

module.exports = { setSession };
