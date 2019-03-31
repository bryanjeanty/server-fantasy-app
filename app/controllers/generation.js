const LIST = (req, res) => {
  res.json({ generation: req.app.locals.engine.generation });
};

const NEW = (req, res) => {};

const ITEM = (req, res) => {};

const EDIT = (req, res) => {};

const CREATE = (req, res) => {};

const UPDATE = (req, res) => {};

const DELETE = (req, res) => {};

module.exports = {
  LIST,
  NEW,
  ITEM,
  EDIT,
  CREATE,
  UPDATE,
  DELETE
};
