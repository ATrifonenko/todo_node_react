module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define('todo', {
    title: { type: Sequelize.STRING, allowNull: false },
    desc: { type: Sequelize.TEXT },
    date_create: { type: Sequelize.DATE, allowNull: false },
    date_update: { type: Sequelize.DATE },
    date_end: { type: Sequelize.DATE },
    status: {
      type: Sequelize.ENUM(['todo', 'inProgress', 'done', 'canceled']),
      defaultValue: 'todo',
      allowNull: false,
    },
    priority: {
      type: Sequelize.ENUM(['high', 'mid', 'low']),
      defaultValue: 'mid',
      allowNull: false,
    },
  });

  Todo.associate = function (models) {
    models.Todo.belongsTo(models.User);
  };

  return Todo;
};
