const db = require("../models");
const user = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, "SECRETPASS", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.userid;
    next();
  });
};

const checkDuplicateAccount = (req, res, next) => {
  // Username
  user
    .findOne({
      where: {
        username: req.body.username,
      },
    })
    .then((user) => {
      if (user) {
        res.status(400).send({
          message: "Account is already used!",
        });
        return;
      }
      next();
    });
};

const signup = (req, res) => {
  // ? save user to db
  user
    .create({
      username: req.body.username,
      account: req.body.account,
      description: req.body.description,
      password: bcrypt.hashSync(req.body.password, 8),
    })
    .then(() => {
      res.json({ message: "Create account successfully!" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const login = (req, res) => {
  user
    .findOne({
      where: {
        account: req.body.account,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "User not found!" });
      }
      var passIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passIsValid) {
        return res
          .staus(401)
          .json({ message: "Password invalid", accessToken: null });
      }

      var token = jwt.sign({ userid: user.userid }, "SECRETPASS", {
        expiresIn: 86400,
      });

      user.update(
        { status: true },
        {
          where: { userid: user.userid },
        }
      );

      return res.status(200).json({
        message: "Login successfully",
        userid: user.userid,
        username: user.username,
        account: user.account,
        description: user.description,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports = { signup, login, verifyToken, checkDuplicateAccount };
