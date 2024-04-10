const express = require("express");
const server = express();

const mongoose = require("mongoose");

main().catch((err) => {
  console.error(err);
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("Connected to MongoDB");
}

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
