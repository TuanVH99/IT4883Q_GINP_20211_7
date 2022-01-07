const { DataTypes } = require("sequelize/dist");
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    userid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  return User;
};
