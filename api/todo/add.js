const models = require('../../database');
const user = require('../../database/models/user');

const add = (req, res) => {
  const { title, desc, priority, status, date_end, executor, creator } = req.body;
  const { userId } = req.session;
  models.Todo.create({
    title,
    desc,
    priority,
    status,
    date_end,
    executor,
    creator,
    userId,
  }).then((todo) => {
    models.User.findOne({ where: { id: executor } })
      .then((user) => (todo.executor !== todo.creator ? user.update({ leader: creator }) : user))
      .then((user) => {
        res.status(200).json({ todo });
      });
  });
};

module.exports = add;
