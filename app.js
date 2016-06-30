const express = require("express"),
      app = express();

app.use("/site-midia-016", express.static(__dirname + "/public"));
app.get("/site-midia-016", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

const server = app.listen(8000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.info(`Listening at http://${ host }:${ port }/site-midia-016`);
});
