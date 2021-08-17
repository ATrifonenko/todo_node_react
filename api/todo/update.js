const models = require('../../database');

const update = (req, res) => {
  console.dir(req.body);
  const { id, title, desc, priority, status, date_end, executor, creator } = req.body;

  models.Todo.findByPk(id).then((todo) => {
    todo
      .update({
        title,
        desc,
        priority,
        status,
        date_end,
        executor,
        creator,
      })
      .then((todo) => res.status(200).json(todo));
  });
};

module.exports = update;
