const express = require("express");
const server = express();

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
