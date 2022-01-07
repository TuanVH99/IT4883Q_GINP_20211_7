const app = require("express")();
const http = require("http").Server(app);
require('dotenv').config();
//----------------
const cors = require("cors");
const bodyParser = require("body-parser");
//-------middleware---------
app.use(cors());
app.use(bodyParser.json());
//----------------

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(3000, () => {
  console.log("App is running on port 3000");
});
