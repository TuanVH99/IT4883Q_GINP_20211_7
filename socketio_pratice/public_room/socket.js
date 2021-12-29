module.exports = function (http) {
  const io = require("socket.io")(http);
  users = [];
  io.on("connection", function (socket) {
    console.log("A user connected");
    socket.on("setUsername", function (data) {
      console.log(data);
      if (users.indexOf(data) > -1) {
        socket.emit(
          "userExists",
          data + " username is taken! Try some other username."
        );
      } else {
        users.push(data);
        socket.emit("userSet", { username: data });
        socket.emit("listUser", users);
      }
    });

    socket.on("msg", function (data) {
      //Send message to everyone
      io.sockets.emit("newmsg", data);
    });
  });
};
