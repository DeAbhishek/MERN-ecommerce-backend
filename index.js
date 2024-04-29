const cors = require("cors");
const mongoose = require("mongoose");

const express = require("express");
const server = express();

const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const brandRouter = require("./routes/brand");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

//middleware

// for expose the headers to the frontend
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

// for parsing the json data
server.use(express.json());

// connect to database
main().catch((err) => {
  console.error(err);
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/MERN-Ecommerce");
  console.log("Connected to MongoDB");
}

//routes

server.use("/products", productRouter);
server.use("/categories", categoryRouter);
server.use("/brands", brandRouter);
server.use("/users", userRouter);
server.use("/auth", authRouter);

// connet the server to 8080 port
server.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
