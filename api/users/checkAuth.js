const models = require('../../database');

const checkAuth = (req, res) => {
  const { userId, email } = req.session;

  if (userId || email) {
    models.User.findByPk(userId).then((user) => {
      res.json({
        user: {
          logged: true,
          name: user.fullName,
        },
      });
    });
  } else {
    res.json({
      user: {
        logged: false,
      },
    });
  }
};

module.exports = checkAuth;
