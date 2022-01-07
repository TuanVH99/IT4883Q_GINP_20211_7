module.exports = (sequelize, Sequelize) => {
  const GroupRoom = sequelize.define("group_rooms", {
    groupid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    gname: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    // owner: {
    //   type: DataTypes.UUIDV,
    //   reference: userModel,
    //   key: "userid",
    //   deferrable: Deferrable.NOT,
    // },
  });
  return GroupRoom;
};
