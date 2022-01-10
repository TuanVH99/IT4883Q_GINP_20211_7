const app = require("express")();
const http = require("http").createServer(app);
require("dotenv").config();
const db = require("./models/index.js");
require("./socket/index")(http);
const { PeerServer } = require("peer");

const customGenerationFunction = () =>
  (Math.random().toString(36) + "0000000000000000000").substr(2, 16);
const peerServer = PeerServer({
  port: 9000,
  path: "/",
  generateClientId: customGenerationFunction,
});

//----------------
const cors = require("cors");
const bodyParser = require("body-parser");
//-------middleware---------
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
peerServer.on("connection", (client) => {
  console.log("A peer user connected");
});
//----------------

// socketio
const io = require("socket.io")(http)
io.on("connection", socket => {
        console.log("connection created")
        socket.on("message", payload => {
            console.log("Msg received on server: ", payload)
            io.emit("message", payload)
        })
    })
    // listen


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

http.listen(3000, () => {
    console.log("App is running on port 3000");
});