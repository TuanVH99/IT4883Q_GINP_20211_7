module.exports = (sequelize, Sequelize) => {
  const MsgPrivate = sequelize.define("msg_private", {
    message: {
      type: Sequelize.STRING(1000),
    },
  });
  return MsgPrivate;
};
