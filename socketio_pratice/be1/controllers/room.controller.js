const db = require("../models");
const private_room = db.privateRoom;
const group_room = db.group_room;
const user = db.user;

const createPrivateRoom = async (req, res) => {
  //   private_room
  //     .create()
  //     .then((msgRoom) => {
  //       res.json({ message: "Create private chat successfully", data: msgRoom });
  //     })
  //     .catch((err) => {
  //       res
  //         .status(400)
  //         .json({ message: "Create private room fail", messageDev: err.message });
  //     });
  try {
    const result = await private_room.create();
    const user1 = await user.findOne({ where: { userid: req.userId } });
    const user2 = await user.findOne({ where: { userid: req.body.targetId } });
    // await result.setUserId1(user1);
    // await result.setUserId2(user2);
    console.log(result)
    res.json({ message: "Create private chat successfully", data: msgRoom });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Create private room fail", messageDev: error.message });
  }
};

const createGroupRoom = (req, res) => { };

const addToGroupRoom = (req, res) => { };

const leftRoom = (req, res) => { };

const kickFromRoom = (req, res) => { };

module.exports = { createPrivateRoom };
