const models = require('../../database');

const add = (req, res) => {
  const { title, desc, priority, status, date_end, executor, creator } = req.body;

  models.Todo.create({
    title,
    desc,
    priority,
    status,
    date_end,
    executor,
    creator,
  }).then((todo) => {
    if (todo.executor !== todo.creator) {
      models.User.findOne({ where: { id: executor } })
        .then((user) => user.update({ leader: creator }))
        .then(() => res.status(200).json({ todo }));
    } else res.status(200).json({ todo });
  });
};

module.exports = add;
