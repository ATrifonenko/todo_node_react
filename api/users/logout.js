const logout = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.status(200).json({
        user: {
          logged: false,
        },
      });
    });
  }
};

module.exports = logout;
