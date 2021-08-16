const express = require('express');
const users = require('./users');
const todo = require('./todo');

const router = express.Router();

router.use('/users', users);
router.use('/todo', todo);

module.exports = router;
