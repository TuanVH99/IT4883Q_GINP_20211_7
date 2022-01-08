const db = require("../models");
const private_room = db.privateRoom;
const group_room = db.group_room;
const user = db.user;

const createPrivateRoom = (req, res) => {
  private_room
    .create()
    .then((msgRoom) => {
      res.json({ message: "Create private chat successfully", data: msgRoom });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Create private room fail", messageDev: err.message });
    });
};

const createGroupRoom = (req, res) => {};

const addToGroupRoom = (req, res) => {};

const leftRoom = (req, res) => {};

const kickFromRoom = (req, res) => {};

module.exports = { createPrivateRoom };
