const NEW = (req, res) => {
  res.json({ dragon: req.app.locals.engine.generation.newDragon() });
};

module.exports = NEW;
