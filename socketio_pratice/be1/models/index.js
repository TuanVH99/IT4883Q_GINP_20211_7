const config = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  port: config.port,
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//----models----
db.user = require("./user.model.js")(sequelize, Sequelize);
db.privateRoom = require("./private_room.model")(sequelize, Sequelize);
db.msgPrivate = require("./msg_private.model")(sequelize, Sequelize);
db.group_room = require("./group_room.model")(sequelize, Sequelize);
db.msgGroup = require("./msg_group.model")(sequelize, Sequelize);
//----relationships----

// ? user send message
db.user.hasOne(db.msgPrivate, {
  foreignKey: "from_user_id",
});
db.msgPrivate.belongsTo(db.user, {
  foreignKey: "from_user_id",
});

// ? message in a dialog chat
db.privateRoom.hasMany(db.msgPrivate, {
  foreignKey: "to_room_id",
});
db.msgPrivate.belongsTo(db.privateRoom, {
  foreignKey: "to_room_id",
});

// ? 2 users in a chat
db.user.hasMany(db.privateRoom, { foreignKey: "user_id1" });
db.user.hasMany(db.privateRoom, { foreignKey: "user_id1" });
db.privateRoom.belongsTo(db.user, { foreignKey: "user_id1" });
db.privateRoom.belongsTo(db.user, { foreignKey: "user_id2" });

// ? user create grp chat
db.user.hasOne(db.group_room, { foreignKey: "owner" });
db.group_room.belongsTo(db.user, { foreignKey: "owner" });

// ? user send msg in grp
db.user.hasMany(db.msgGroup, { foreignKey: "sender_user_id" });
db.msgGroup.belongsTo(db.user, { foreignKey: "sender_user_id" });
db.group_room.hasMany(db.msgGroup, { foreignKey: "to_grp_id" });
db.msgGroup.belongsTo(db.msgGroup, { foreignKey: "to_grp_id" });

// ? users in a grp
db.groupUser = sequelize.define("group_user", {});
db.user.belongsToMany(db.group_room, { through: db.groupUser });
db.group_room.belongsToMany(db.user, { through: db.groupUser });

//----initialize variable----

//=============
module.exports = db;
