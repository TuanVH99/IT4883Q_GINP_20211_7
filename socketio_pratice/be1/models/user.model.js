module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    userid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    account: {
      type: Sequelize.STRING(16),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(30),
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
  return User;
};
