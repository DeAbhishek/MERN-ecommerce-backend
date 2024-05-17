const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const express = require("express");
const server = express();

const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const brandRouter = require("./routes/brand");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const { User } = require("./model/User");

//middleware

// session middleware
server.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);

server.use(passport.authenticate("session"));

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
server.use("/cart", cartRouter);
server.use("/orders", orderRouter);

//Configure Password Strategy

passport.use(
  new LocalStrategy(async function (username, password, done) {
    // by default password uses username
    try {
      const user = await User.findOne({ username });
      // console.log(username, password, user);
      if (!user) {
        return done(null, false, { message: "invalid credentials" }); // for safety
      }
      if (user.password !== password) {
        return done(null, false, { message: "invalid credentials" });
      }
      done(null, user); // this lines sends to serializer
    } catch (err) {
      done(err);
    }
  })
);

// serializeUser and deserializeUser function

passport.serializeUser(function (user, cb) {
  console.log("serialize", user);
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// connet the server to 8080 port
server.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
