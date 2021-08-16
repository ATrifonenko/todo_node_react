module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define('todo', {
    title: { type: Sequelize.STRING, allowNull: false },
    desc: { type: Sequelize.TEXT },
    date_end: { type: Sequelize.DATEONLY },
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
    creator: {
      type: Sequelize.STRING,
      // allowNull: false,
    },
    executor: {
      type: Sequelize.STRING,
    },
  });

  Todo.associate = function (models) {
    models.Todo.belongsTo(models.User);
  };

  return Todo;
};
