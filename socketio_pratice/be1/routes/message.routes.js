const { verifyToken } = require("../controllers/auth.controller");
const controller = require("../controllers/message.controller");

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/message/private/:targetId",
    verifyToken,
    controller.getListPrivateMessage
  );
  app.post("/api/message/private", verifyToken, controller.sendPrivateMessage);
};
