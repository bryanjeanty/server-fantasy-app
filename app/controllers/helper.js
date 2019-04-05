const Session = require("../models/account/session");
const AccountTable = require("../models/account/table.js");
const { hash } = require("../models/account/helper.js");

const setSession = ({ username, res, sessionId }) => {
  return new Promise((resolve, reject) => {
    let session, sessionString;

    if (sessionId) {
      sessionString = Session.sessionString({ username, id: sessionId });
      setSessionCookie({ sessionString, res });

      resolve({ message: "session restored" });
    } else {
      session = new Session({ username });
      sessionString = session.toString();

      AccountTable.updateSessionId({
        sessionId: session.id,
        usernameHash: hash(username)
      })
        .then(() => {
          setSessionCookie({ sessionString, res });

          resolve({ message: "session was created" });
        })
        .catch(error => reject(error));
    }
  });
};

setSessionCookie = ({ sessionString, res }) => {
  res.cookie("sessionString", sessionString, {
    expire: Date.now() + 3600000,
    httpOnly: true
    // secure: true // Should be used with https (extremely important for production ready projects)
  });
};

module.exports = { setSession };
