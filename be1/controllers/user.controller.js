const { Op } = require("sequelize");
const db = require("../models");
const user = db.user;

const getInformation = (req, res) => {
  user
    .findOne({ where: { userid: req.userId } })
    .then((user) => {
      res.json({ message: "Get user infomation", data: user });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Get data failed!", messageDev: err.message });
    });
};

const getListOfUser = async (req, res) => {
  try {
    const listUser = await user.findAll({
      where: {
        userid: {
          [Op.not]: req.userId,
        },
      },
      order: [["createdAt", "DESC"]],
      limit: 25,
      offset: req.query.rows ? req.query.rows : 0,
    });
    if (!listUser) {
      throw new Error("List user is empty");
    }
    res.json({
      message: "List user get!",
      data: listUser,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Get data failed!", messageDev: err.message });
  }
};

module.exports = { getInformation, getListOfUser };
