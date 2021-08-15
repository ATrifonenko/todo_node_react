const models = require('../../database');
const bcrypt = require('bcrypt');

const signUp = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const secondName = req.body.secondName;
  const patronymic = req.body.patronymic;
  const errors = {};

  if (!email) {
    errors.global = 'Не введен логин';
    res.status(400).json({ errors, user: { signup: false } });
  } else if (!password) {
    errors.global = 'Не введен пароль';
    res.status(400).json({ errors, user: { signup: false } });
  } else {
    models.User.findOne({ where: { email } }).then((user) => {
      if (user) {
        errors.global = 'Такой пользователь уже существует';
        res.status(400).json({ errors, user: { signup: false } });
      } else {
        bcrypt.hash(password, 10, function (err, hash) {
          if (err) throw err;
          models.User.create({
            email,
            password: hash,
            firstName,
            secondName,
            patronymic,
          }).then((user) => {
            req.session.userId = user.id;
            req.session.userEmail = user.email;
            res.status(200).json({
              user: { logged: true, name: user.fullName },
            });
          });
        });
      }
    });
  }
};

module.exports = signUp;
