const express = require('express');
const add = require('./add');
const getTodo = require('./getTodo');
const getTodoById = require('./getTodoById');

const users = express.Router();

users.post('/add', add);
users.get('/getTodo', getTodo);
users.get('/getTodoById', getTodoById);

module.exports = users;
