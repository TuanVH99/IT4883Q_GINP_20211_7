module.exports = (sequelize, Sequelize) => {
  const GroupRoom = sequelize.define("group_rooms", {
    groupid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    gname: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });
  return GroupRoom;
};
