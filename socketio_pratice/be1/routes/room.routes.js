const { verifyToken } = require("../controllers/auth.controller");
const controller = require("../controllers/room.controller");

// * POST api/room/private :create privateroom
// * GET api/room/private/:roomid : get data about private room if you are in this room
// * POST api/room/group :create grouproom
// * GET api/room/group/:roomid : get data about group room if you are in this room

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/room/private", verifyToken, controller.createPrivateRoom)
}