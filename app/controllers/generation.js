const INDEX = (req, res) => {
  res.json({ generation: req.app.locals.engine.generation });
};

module.exports = INDEX;
