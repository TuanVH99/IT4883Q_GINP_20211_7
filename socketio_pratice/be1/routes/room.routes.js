const { verifyToken } = require("../controllers/auth.controller");
const controller = require("../controllers/room.controller");

// * GET api/room/private/ - Get list of chats
// * POST api/room/private - create privateroom
//-----------------------------------------------------
// * GET api/room/group/:userid - Get list of group chats
// * POST api/room/group - create grouproom
// * POST api/room/group/add - add member to group
// * PUT api/room/group - change room information, but first is kick
// * PUT api/room/group/kick -
// * PUT api/room/group/left

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/room/private", verifyToken, controller.createPrivateRoom);
  //-------------------------------------------------------------------
  app.post("/api/room/group", verifyToken, controller.createGroupRoom);
  app.post("/api/room/group/add", verifyToken, controller.addToGroupRoom);
  app.put("api/room/group/kick", verifyToken, controller.kickFromRoom);
  app.put("api/room/group/left", verifyToken, controller.leftRoom);
};
