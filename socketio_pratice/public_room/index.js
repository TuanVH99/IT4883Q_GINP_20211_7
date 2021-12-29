const app = require("express")();
const http = require("http").Server(app);

require("./socket")(http);
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

http.listen(3000);




