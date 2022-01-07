const { DataTypes, Deferrable } = require("sequelize");
const private_roomModel = require("./private_room.model");
const userModel = require("./user.model");

module.exports = (sequelize, Sequelize) => {
  const MsgPrivate = sequelize.define("msg_private", {
    // sender: {
    //   type: DataTypes.UUIDV,
    //   reference: userModel,
    //   key: "userid",
    //   deferrable: Deferrable.NOT,
    // },
    message: {
      type: DataTypes.STRING(1000),
    },
    // to: {
    //   type: DataTypes.UUIDV,
    //   reference: private_roomModel,
    //   key: "roomid",
    //   deferrable: Deferrable.NOT,
    // },
  });
  return MsgPrivate;
};
