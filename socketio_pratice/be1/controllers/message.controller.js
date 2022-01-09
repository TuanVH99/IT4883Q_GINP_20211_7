const { Op } = require("sequelize");
const db = require("../models");
const msgPrivate = db.msgPrivate;
const msgGroup = db.msgGroup;
const user = db.user;
const privateRoom = db.privateRoom;
const groupRoom = db.group_room;
const groupUser = db.groupUser;

//--------------------------------------------

const _getListPrivateMessage = async (userId, targetId, rows) => {
  try {
    // ! start, end default is top 25 latest messages from conversation
    const conversation = await privateRoom.findOne({
      where: {
        [Op.or]: [
          { user_id1: userId, user_id2: targetId },
          { user_id2: userId, user_id1: targetId },
        ],
      },
    });
    if (!conversation) {
      throw new Error("Private chat not found!");
    }
    const listMessage = await msgPrivate.findAll({
      where: {
        to_room_id: conversation.getDataValue("roomid"),
      },
      order: [["createdAt", "DESC"]],
      limit: 25,
      offset: rows ? rows : 0,
    });
    return listMessage;
  } catch (error) {
    throw error;
  }
};
const getListPrivateMessage = async (req, res) => {
  try {
    const rows = req.query.rows;
    const result = await _getListPrivateMessage(
      req.userId,
      req.params.targetId,
      rows
    );
    res.json({ message: "Message sent!", data: result });
  } catch (error) {
    res.status(400).json({
      message: "Get list message private fail",
      messageDev: error.message,
    });
  }
};

const _sendPrivateMessage = async (userId, targetId, message) => {
  try {
    const conversation = await privateRoom.findOne({
      where: {
        [Op.or]: [
          { user_id1: userId, user_id2: targetId },
          { user_id2: userId, user_id1: targetId },
        ],
      },
    });
    if (!conversation) {
      throw new Error("Private chat not found!");
    }

    const newMessage = await msgPrivate.create({
      message: message,
      from_user_id: userId,
      to_room_id: conversation.getDataValue("roomid"),
    });
    return newMessage;
  } catch (error) {
    throw error;
  }
};

const sendPrivateMessage = async (req, res) => {
  try {
    const result = await _sendPrivateMessage(
      req.userId,
      req.body.targetId,
      req.body.message
    );
    res.json({
      message: "Message sent!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: "Message send fail",
      messageDev: error.message,
    });
  }
};

//--------------------------------------------

const _getListGroupMessage = async (userId, groupId, rows) => {
  try {
    // ! Check if room is exist
    const room = await groupRoom.findOne({
      where: {
        groupid: groupId,
      },
    });
    if (!room) {
      throw new Error("Group not found");
    }
    // ! Check if user is in this room
    const userInRoom = await groupUser.findOne({
      where: {
        userUserid: userId,
        groupRoomGroupid: groupId,
      },
    });
    if (!userInRoom) {
      throw new Error("You are not in this room!");
    }
    // ! Get list latest messages
    const listMessage = await msgGroup.findAll({
      where: {
        groupRoomGroupid: groupId,
      },
      order: [["createdAt", "DESC"]],
      limit: 25,
      offset: rows ? rows : 0,
    });
  } catch (error) {
    throw error;
  }
};

const getListGroupMessage = async (req, res) => {
  try {
    const result = await _getListGroupMessage(
      req.userId,
      req.params.groupId,
      req.query.rows
    );
  } catch (error) {
    res.status(400).json({
      message: "Get list message group fail",
      messageDev: error.message,
    });
  }
};

const _sendGroupMessage = async (userId, groupId, message) => {
  try {
    // ! Check if room is exist
    const room = await groupRoom.findOne({
      where: {
        groupid: groupId,
      },
    });
    if (!room) {
      throw new Error("Group not found");
    }
    // ! Check if user is in this room
    const userInRoom = await groupUser.findOne({
      where: {
        userUserid: userId,
        groupRoomGroupid: groupId,
      },
    });
    if (!userInRoom) {
      throw new Error("You are not in this room!");
    }

    const newMessage = await msgGroup.create({
      message: message,
      sender_user_id: userId,
      to_group_id: groupId,
    });
    return newMessage;
  } catch (error) {
    throw error;
  }
};

const sendGroupMessage = async (req, res) => {
  try {
    const result = await _sendGroupMessage(
      req.userId,
      req.body.groupId,
      req.body.message
    );
    res.json({
      message: "Message sent!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: "Message send fail",
      messageDev: error.message,
    });
  }
};

module.exports = {
  _getListPrivateMessage,
  _sendPrivateMessage,
  _getListGroupMessage,
  _sendGroupMessage,
  getListPrivateMessage,
  sendPrivateMessage,
  getListGroupMessage,
  sendGroupMessage,
};
