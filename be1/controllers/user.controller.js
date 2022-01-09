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

module.exports = { getInformation };
