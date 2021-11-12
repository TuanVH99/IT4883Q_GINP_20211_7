const { response } = require("express");
const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
