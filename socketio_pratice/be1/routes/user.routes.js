const { verifyToken } = require("../controllers/auth.controller");
const controller = require("../controllers/user.controller");

// * GET api/user/info

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/info", verifyToken, controller.getInformation);
};
