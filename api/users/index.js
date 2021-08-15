const express = require('express');
const checkAuth = require('./checkAuth');
const signUp = require('./signup');
const signIn = require('./signin');
const logout = require('./logout');

const users = express.Router();

users.get('/checkAuth', checkAuth);
users.post('/signUp', signUp);
users.post('/signIn', signIn);
users.get('/logout', logout);

module.exports = users;
