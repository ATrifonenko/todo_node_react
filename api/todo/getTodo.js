const models = require('../../database');
const { Op } = require('sequelize');

const getTodo = (req, res) => {
  const { userId } = req.query;
  models.Todo.findAll({
    where: { [Op.or]: [{ creator: userId }, { executor: userId }] },
    order: [['updatedAt', 'DESC']],
  }).then((todo) => res.status(200).json({ todo }));
};

module.exports = getTodo;
