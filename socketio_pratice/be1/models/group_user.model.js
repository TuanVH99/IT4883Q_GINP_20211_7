const { DataTypes, Deferrable } = require("sequelize/dist");
const group_roomModel = require("./group_room.model");
const userModel = require("./user.model");

module.exports = (sequelize, Sequelize) => {
  const GroupUser = define("group_user", {
    groupid: {
      type: DataTypes.UUID,
      reference: group_roomModel,
      key: "groupid",
      deferrable: Deferrable.NOT,
    },
    userid: {
      type: DataTypes.UUID,
      reference: userModel,
      key: "userid",
      deferrable: Deferrable.NOT,
    },
  });
};
