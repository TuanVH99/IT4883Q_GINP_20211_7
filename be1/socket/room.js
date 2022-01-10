module.exports = function (socket) {
  // user join room
  socket.on("userJoinPrivateRoom", (data) => {
    socket.join(data.roomId);
  });
};
