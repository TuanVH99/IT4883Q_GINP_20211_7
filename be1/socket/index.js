module.exports = function (http) {
  const io = require("socket.io")(http);
  io.on("connection", function (socket) {
    console.log("An user has connected!");
    // console.log(socket);
    //----------user------------
    socket.on("userOnline", (data) => {
      console.log(data);
    });
    //----------room------------
    socket.on("userJoinPrivateRoom", (data) => {
      console.log("some user open a private chart, private chat data:");
      console.log(data);
      socket.join(data.roomid);
    });
    //----------message------------
    socket.on("sendPrivateMessage", (data) => {
      console.log("some user send private message, roomid:");
      console.log(data["to_room_id"]);
      io.to(data["to_room_id"]).emit("newPrivateMessage", data);
    });
    //----------Call------------
    socket.on("want4Call", (data) => {
      console.log("some user want to make a voice call!");
      socket.broadcast.to(data.room).emit("ready4Call", data);
    });
    socket.on("ok2Call", (data) => {
      console.log("ready for call");
      socket.broadcast.to(data.room).emit("canCall", data);
    });
    //-----------------------------
    socket.on("disconnect", function () {
      console.log("An user has disconnected");
    });
  });
};
