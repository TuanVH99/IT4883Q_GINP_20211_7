const controller = require("../controllers/auth.controller");
// * POST signup
// * POST login
module.exports = function (app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [controller.checkDuplicateAccount],
    controller.signup
  );
  app.post("/api/auth/login", controller.login);
};
