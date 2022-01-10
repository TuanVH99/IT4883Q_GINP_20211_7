const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const { PeerServer } = require("peer");

const customGenerationFunction = () =>
  (Math.random().toString(36) + "0000000000000000000").substr(2, 16);
const peerServer = PeerServer({
  port: 9000,
  path: "/",
  generateClientId: customGenerationFunction,
});

//----------------
//----------------

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

peerServer.on("connection", (client) => {
  console.log("A peer user connected");
});

io.on("connection", function (socket) {
  console.log("A socket user has connected!");
  socket.on("myId", (data) => {
    io.emit("getId", data);
  });
  // console.log(socket);
  //----------user------------

  //----------room------------

  //----------message------------

  //----------Call------------

  //-----------------------------
});

http.listen(3000, () => {
  console.log("App is running on port 3000");
});
