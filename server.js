const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(express.static(path.join(__dirname, './client/build')));

server.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

server.listen(9090, function () {
  console.log('Server lestening on port 9090!');
});
