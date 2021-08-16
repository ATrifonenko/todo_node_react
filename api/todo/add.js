const models = require('../../database');

const add = (req, res) => {
  const { title, desc, priority, status, date, executor } = req.body;

  models.Todo.create({
    title,
    desc,
    priority,
    status,
    date_end: date,
    executor,
  }).then((todo) => res.status(200).json({ todo }));
};

module.exports = add;
