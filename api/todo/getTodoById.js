const models = require('../../database');

const getTodoById = (req, res) => {
  const { id } = req.query;
  models.Todo.findByPk(id).then((todo) => res.status(200).json(todo));
};

module.exports = getTodoById;
