module.exports = (sequelize, Sequelize) => {
  const PrivateRoom = sequelize.define("private_room", {
    roomid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
  });
  return PrivateRoom;
};
