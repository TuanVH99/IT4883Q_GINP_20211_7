const app = require("express")();
const http = require("http").Server(app);
require("dotenv").config();
const db = require("./models/index.js");
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
