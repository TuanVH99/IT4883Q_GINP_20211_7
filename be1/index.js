const app = require("express")();
const http = require("http").createServer(app);
require("dotenv").config();
const db = require("./models/index.js");

//----------------
const cors = require("cors");
const bodyParser = require("body-parser");
//-------middleware---------
app.use(cors());
app.use(bodyParser.json());
//----------------
const PORT = process.env.BACKEND_DOCKER_PORT || 3000;
require("./socket/index")(http);
//----------------
// const { PeerServer } = require("peer");

// const customGenerationFunction = () =>
//   (Math.random().toString(36) + "0000000000000000000").substr(2, 16);
// const peerServer = PeerServer({
//   port: 9000,
//   path: "/",
//   generateClientId: customGenerationFunction,
// });
// peerServer.on("connection", (client) => {
//   console.log("A peer user connected");
// });
//----------------
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/resetdb", (req, res) => {
  db.sequelize
    .sync({ force: true })
    .then(() => {
      console.log("Resync DB");
      res.send("DB sync");
    })
    .catch((err) => {
      console.log(err.message);
      res.send("DB Sync Fail!");
    });
});

//-------------define routes---------------
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/room.routes")(app);
require("./routes/message.routes")(app);
//-----------------------------------------

http.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
