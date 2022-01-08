const db = require("../models");
const private_room = db.privateRoom;
const group_room = db.group_room;
const groupUser = db.groupUser;
const user = db.user;

const createPrivateRoom = async (req, res) => {
  try {
    const user1 = await user.findOne({ where: { userid: req.userId } });
    const user2 = await user.findOne({ where: { userid: req.body.targetId } });
    const result = await private_room.create({
      user_id1: user1.getDataValue("userid"),
      user_id2: user2.getDataValue("userid"),
    });
    res.json({ message: "Create private chat successfully", data: result });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Create private room fail", messageDev: error.message });
  }
};

const createGroupRoom = async (req, res) => {
  try {
    const currentUser = await user.findOne({ where: { userid: req.userId } });
    const result = await group_room.create({
      gname: req.body.groupname
        ? req.body.groupname
        : `Group of ${currentUser.getDataValue("username")}`,
      description: req.body.description,
      owner: currentUser.getDataValue("userid"),
    });
    const result2 = await groupUser.create({
      userUserid: currentUser.getDataValue("userid"),
      groupRoomGroupid: result.getDataValue("groupid"),
    });
    res.json({ message: "Create group chat successfully", data: result });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Create group room fail", messageDev: error.message });
  }
};

const addToGroupRoom = async (req, res) => {
  try {
    // ! check if requester is the room owner or the room is existed
    const room = await group_room.findOne({
      where: {
        groupid: req.body.groupid,
      },
    });
    if (!room) {
      throw new Error("Room not found!");
    }
    var roomOwnerId = room.getDataValue("owner");
    if (req.userId != roomOwnerId) {
      throw new Error("You dont have permission to do that!");
    }
    const result = await groupUser.create({
      userUserid: req.body.targetId,
      groupRoomGroupid: req.body.groupid,
    });
    res.json({
      message: "Add member to group successfully!",
      data: { ...room, ...result },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Add member to group fail!",
      messageDev: error.message,
    });
  }
};

const leftRoom = (req, res) => {};

const kickFromRoom = (req, res) => {};

module.exports = { createPrivateRoom, createGroupRoom, addToGroupRoom };
