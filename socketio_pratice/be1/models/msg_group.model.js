const { DataTypes, Deferrable } = require("sequelize");
const group_roomModel = require("./group_room.model");
const userModel = require("./user.model");

module.exports = (sequelize, Sequelize) => {
  const MsgGroup = sequelize.define("msg_group", {
    // sender: {
    //   type: DataTypes.UUIDV,
    //   reference: userModel,
    //   key: "userid",
    //   deferrable: Deferrable.NOT,
    // },
    message: {
      type: Sequelize.STRING(1000),
    },
    // to: {
    //   type: DataTypes.UUIDV,
    //   reference: group_roomModel,
    //   key: "groupid",
    //   deferrable: Deferrable.NOT,
    // },
  });
  return MsgGroup;
};
