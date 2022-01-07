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
// db.groupUser = require("./group_user.model")(sequelize, Sequelize);
//----relationships----
//----initialize variable----

//=============
module.exports = db;
