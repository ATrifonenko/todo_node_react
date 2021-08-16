const models = require('../../database');

const getTodo = (req, res) => {
  models.Todo.findAll().then((todo) => res.status(200).json({ todo }));
};

module.exports = getTodo;
