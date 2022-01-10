const { Op } = require("sequelize");
const db = require("../models");
const private_room = db.privateRoom;
const group_room = db.group_room;
const groupUser = db.groupUser;
const user = db.user;

const getListPrivateRoom = async (req, res) => {
  try {
    console.log(req.userId);
    const listRoom = await private_room.findAll({
      where: {
        [Op.or]: [{ user_id1: req.userId }, { user_id2: req.userId }],
      },
      order: [["createdAt", "DESC"]],
      limit: 10,
      offset: req.query.rows ? req.query.rows : 0,
    });
    res.json({
      message: "Gest list private room successfully!",
      data: listRoom,
    });
  } catch (error) {
    res.status(400).json({
      message: "Get list private rooms fail",
      messageDev: error.message,
    });
  }
};

const getPrivateRoomInformation = async (req, res) => {
  try {
    const user1 = await user.findOne({ where: { userid: req.userId } });
    const user2 = await user.findOne({
      where: { userid: req.params.targetId },
    });
    if (!user2) {
      throw new Error("User not Found!");
    }
    const roomExisted = await private_room.findOne({
      where: {
        [Op.or]: [
          {
            user_id1: user1.getDataValue("userid"),
            user_id2: user2.getDataValue("userid"),
          },
          {
            user_id1: user2.getDataValue("userid"),
            user_id2: user1.getDataValue("userid"),
          },
        ],
      },
    });
    if (!roomExisted) {
      throw new Error("Conversation not found!");
    }
    res.json({ message: "Get private room data!", data: roomExisted });
  } catch (error) {
    res.status(400).json({
      message: "Get information fail",
      messageDev: error.message,
    });
  }
};

const createPrivateRoom = async (req, res) => {
  try {
    const user1 = await user.findOne({ where: { userid: req.userId } });
    const user2 = await user.findOne({ where: { userid: req.body.targetId } });
    if (!user2) {
      throw new Error("User not Found!");
    }
    const roomExisted = await private_room.findOne({
      where: {
        [Op.or]: [
          {
            user_id1: user1.getDataValue("userid"),
            user_id2: user2.getDataValue("userid"),
          },
          {
            user_id1: user2.getDataValue("userid"),
            user_id2: user1.getDataValue("userid"),
          },
        ],
      },
    });
    if (roomExisted) {
      throw new Error("Can't create new conversation!");
    }
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

const getListGroupRoom = async (req, res) => {
  try {
    // const list = await groupUser.findAll({
    //   include: {
    //     model: group_room,
    //     where: {
    //       userUserid: req.userId,
    //     },
    //     order: [["createdAt", "DESC"]],
    //     limit: 10,
    //     offset: req.query.rows ? req.query.rows : 0,
    //   },
    // });

    const list = await group_room.findAll({
      // include: {
      //   model: user,
      //   through: {
      //     where: {
      //       userUserid: req.userId,
      //     },
      //   },
      //   // where: {
      //   //   userUserid: req.userId,
      //   // },
      //   // order: [["createdAt", "DESC"]],
      //   // limit: 10,
      //   // offset: req.query.rows ? req.query.rows : 0,
      // },
      include: user,
    });

    res.json({
      message: "Get list group room",
      data: list,
    });
  } catch (error) {
    res.status(400).json({
      message: "Get list group rooms fail",
      messageDev: error.message,
    });
  }
};

const getGroupRoomInformation = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({
      message: "Get information fail",
      messageDev: error.message,
    });
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
    res.json({
      message: "Create group chat successfully",
      data: { ...result, ...result2 },
    });
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
    res.status(400).json({
      message: "Add member to group fail!",
      messageDev: error.message,
    });
  }
};

const leftRoom = async (req, res) => {
  try {
    // ! check if user is in room, if owner left the rooom, somebody has to be the boss now :D
    const room = await group_room.findOne({
      where: {
        groupid: req.body.groupid,
      },
    });
    if (!room) {
      throw new Error("Room not found!");
    }
    const userInRoom = await groupUser.findOne({
      where: {
        userUserid: req.userId,
        groupRoomGroupid: req.body.groupid,
      },
    });
    if (!userInRoom) {
      throw new Error("You dont have permission to do that!");
    }
    await groupUser.destroy({
      where: {
        userUserid: req.userId,
        groupRoomGroupid: req.body.groupid,
      },
    });
    res.json({ message: "You have left the room successfully!" });
  } catch (error) {
    res.status(400).json({
      message: "Leave group fail!",
      messageDev: error.message,
    });
  }
};

const kickFromRoom = async (req, res) => {
  try {
    // ! Only owner of the group can do that, check if user is in room
    const room = await group_room.findOne({
      where: {
        groupid: req.body.groupid,
      },
    });
    if (room.getDataValue("owner") != req.userId) {
      throw new Error("You dont have permission to do that!");
    }
    const userInRoom = await groupUser.findOne({
      where: {
        userUserid: req.body.targetId,
        groupRoomGroupid: req.body.groupid,
      },
    });
    if (!userInRoom) {
      throw new Error("User is not in this room");
    }
    await groupUser.destroy({
      where: {
        userUserid: req.userId,
        groupRoomGroupid: req.body.groupid,
      },
    });
    res.json({ message: "Kick user!" });
  } catch (error) {
    res.status(400).json({
      message: "Kick user out of group fail!",
      messageDev: error.message,
    });
  }
};

module.exports = {
  getPrivateRoomInformation,
  getListPrivateRoom,
  createPrivateRoom,
  getListGroupRoom,
  createGroupRoom,
  addToGroupRoom,
  leftRoom,
  kickFromRoom,
};
