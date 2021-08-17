const models = require('../../database');

const checkAuth = (req, res) => {
  const { userId, email } = req.session;

  if (userId || email) {
    models.User.findByPk(userId).then((user) => {
      res.status(200).json({
        user: {
          logged: true,
          id: user.id,
          name: user.fullName,
        },
      });
    });
  } else {
    res.status(401).json({
      user: {
        logged: false,
      },
    });
  }
};

module.exports = checkAuth;
