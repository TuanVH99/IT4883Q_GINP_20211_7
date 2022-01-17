const express = require("express");
const { ExpressPeerServer } = require("peer");

const app = express();
const PORT = process.env.VIDEOSERVER_DOCKER_PORT || 9000;
const http = require("http");
const server = http.createServer(app);

const customGenerationFunction = () =>
  (Math.random().toString(36) + "0000000000000000000").substr(2, 16);
const peerServer = ExpressPeerServer(server, {
  path: "/",
  generateClientId: customGenerationFunction,
});

app.use("/", peerServer);

peerServer.on("connection", (client) => {
  console.log("A peer user connected");
});

server.listen(PORT, () => {
  console.log(`Video server listening on port ${PORT}`);
});
