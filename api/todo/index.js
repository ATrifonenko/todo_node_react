const express = require('express');
const add = require('./add');
const update = require('./update');
const getTodo = require('./getTodo');
const getTodoById = require('./getTodoById');

const users = express.Router();

users.post('/add', add);
users.post('/update', update);
users.get('/getTodo', getTodo);
users.get('/getTodoById', getTodoById);

module.exports = users;
