const Sequelize = require('sequelize');
const config = require('../config');
const userModel = require('./models/user.js');
const todoModel = require('./models/todo.js');

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  dialect: 'mysql',
  define: { timestamps: false },
});

const db = {
  User: userModel(sequelize, Sequelize.DataTypes),
  Todo: todoModel(sequelize, Sequelize.DataTypes),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
