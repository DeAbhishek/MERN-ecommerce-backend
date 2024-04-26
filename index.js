const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const brandRouter = require("./routes/brand");
const express = require("express");
const server = express();

const mongoose = require("mongoose");

//middleware

server.use(express.json());

main().catch((err) => {
  console.error(err);
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/MERN-Ecommerce");
  console.log("Connected to MongoDB");
}

//routes for products

server.use("/products", productRouter);
server.use("/categories", categoryRouter);
server.use("/brands", brandRouter);

server.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
