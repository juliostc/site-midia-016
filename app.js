const express = require("express"),
      app = express();

app.use(express.static(__dirname + "/public"));
app.use(function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

const server = app.listen(8000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.info(`Listening at http://${ host }:${ port }`);
});
