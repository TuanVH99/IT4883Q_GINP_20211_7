const { DataTypes, Deferrable } = require("sequelize/dist");
const userModel = require("./user.model");

module.exports = (sequelize, Sequelize) => {
  const PrivateRoom = sequelize.define("private_room", {
    roomid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user1id: {
      type: DataTypes.UUID,
      reference: userModel,
      key: "userid",
      deferrable: Deferrable.NOT,
    },
    user2id: {
      type: DataTypes.UUID,
      reference: userModel,
      key: "userid",
      deferrable: Deferrable.NOT,
    },
  });
  return PrivateRoom;
};
