const models = require('../../database');
const bcrypt = require('bcrypt');

const signIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = {};

  if (!email) {
    errors.global = 'Не введен логин';
    res.status(400).json({ errors, user: { logged: false } });
  } else if (!password) {
    errors.global = 'Не введен пароль';
    res.status(400).json({ errors, user: { logged: false } });
  } else {
    models.User.findOne({ where: { email } }).then((user) => {
      if (!user) {
        errors.global = 'Логин или пароль введен не верно';
        res.status(400).json({ errors, user: { logged: false } });
      } else {
        bcrypt.compare(password, user.password, function (err, result) {
          if (!result) {
            errors.global = 'Логин или пароль введен не верно';
            res.status(400).json({ errors, user: { logged: false } });
          } else {
            req.session.userId = user.id;
            req.session.userEmail = user.email;
            res.status(200).json({
              user: { logged: true, id: user.id, name: user.fullName },
            });
          }
        });
      }
    });
  }
};

module.exports = signIn;
