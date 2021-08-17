const models = require('../../database');
const { Op } = require('sequelize');

const getMyEmployee = (req, res) => {
  const { id } = req.query;
  models.User.findByPk(id).then((iUser) => {
    const query = iUser.leader
      ? {
          where: {
            [Op.or]: [
              { id: id },
              {
                [Op.or]: [
                  { leader: id },
                  {
                    [Op.and]: [
                      {
                        id: {
                          [Op.ne]: iUser.leader,
                        },
                      },
                      {
                        leader: null,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        }
      : {
          where: {
            [Op.or]: [
              { id: id },
              {
                [Op.or]: [{ leader: id }, { leader: null }],
              },
            ],
          },
        };

    models.User.findAll(query).then((users) =>
      res.status(200).json(users.map((user) => ({ id: user.id, name: user.fullName })))
    );
  });
};

module.exports = getMyEmployee;
