const { DataTypes } = require("sequelize/dist");
const userModel = require("./user.model");
module.exports = (sequelize, Sequelize) => {
  const GroupRoom = sequelize.define("group_rooms", {
    groupid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    gname: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    owner: {
      type: DataTypes.UUIDV,
      reference: userModel,
      key: "userid",
      deferrable: Deferrable.NOT,
    },
  });
  return GroupRoom;
};
