const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const GenerationEngine = require("./models/generation/engine.js");
const dragonRouter = require("./routes/dragon.js");
const generationRouter = require("./routes/generation.js");
const accountRouter = require("./routes/account.js");

const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;

app.use(cors({ origin: "http://localhost:5100" }));
app.use(bodyParser.json());

app.use("/account", accountRouter);
app.use("/dragon", dragonRouter);
app.use("/generation", generationRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    type: "error",
    message: err.message
  });
});

engine.start();

module.exports = app;
