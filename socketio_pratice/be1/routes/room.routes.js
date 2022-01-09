const { verifyToken } = require("../controllers/auth.controller");
const controller = require("../controllers/room.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/room/private", verifyToken, controller.getListPrivateRoom);
  app.post("/api/room/private", verifyToken, controller.createPrivateRoom);
  //-------------------------------------------------------------------
  app.get("/api/room/group", verifyToken, controller.getListGroupRoom);
  app.post("/api/room/group", verifyToken, controller.createGroupRoom);
  app.post("/api/room/group/add", verifyToken, controller.addToGroupRoom);
  app.put("api/room/group/kick", verifyToken, controller.kickFromRoom);
  app.put("api/room/group/left", verifyToken, controller.leftRoom);
};
