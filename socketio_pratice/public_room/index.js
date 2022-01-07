module.exports = function (http) {
  const io = require("socket.io")(http);
  var users = [];
  io.on("connection", function (socket) {
    console.log("A user connected");
    socket.on("setUsername", function (data) {
      let tmp = users.map((item) => item.user);

      if (tmp.indexOf(data) > -1) {
        socket.emit(
          "userExists",
          data + " username is taken! Try some other username."
        );
      } else {
        users.push({ user: data, id: socket.id });
        socket.emit("userSet", { username: data });
        io.emit("listUser", {
          users: users,
          message: `${data} has join the chat`,
        });
      }
    });

    socket.on("msg", function (data) {
      //Send message to everyone
      io.sockets.emit("newmsg", data);
    });

    socket.on("disconnect", function () {
      users = users.filter((item) => item.id != socket.id);
      socket.emit("listUser", users);
      console.log("A user disconnected");
    });
  });
};
