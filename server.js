const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./api');
const models = require('./database');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const config = require('./config');
const cors = require('cors');

const server = express();

server.use(cors());

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(
  session({
    secret: config.SESSION_SECRET,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    store: new SequelizeStore({
      db: models.sequelize,
      expiration: 7 * 24 * 60 * 60 * 1000,
    }),
    resave: false,
    saveUninitialized: false,
  })
);

server.use(express.static(path.join(__dirname, './client/build')));

server.use('/api', api);

server.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

server.listen(5000, async function () {
  await models.sequelize.sync();
  console.log('All models were synchronized successfully.');
  console.log('Server lestening on port 5000!');
});
