module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    firstName: { type: Sequelize.STRING, allowNull: false },
    secondName: { type: Sequelize.STRING, allowNull: false },
    patronymic: { type: Sequelize.STRING, allowNull: false },
    fullName: {
      type: Sequelize.VIRTUAL(Sequelize.STRING, ['secondName', 'firstName', 'patronymic']),
      get() {
        return this.secondName + ' ' + this.firstName + ' ' + this.patronymic;
      },
    },
  });

  User.associate = function (models) {
    models.User.hasMany(models.Todo);
  };

  return User;
};
