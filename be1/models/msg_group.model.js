module.exports = (sequelize, Sequelize) => {
  const MsgGroup = sequelize.define("msg_group", {
    message: {
      type: Sequelize.STRING(1000),
    },
  });
  return MsgGroup;
};
