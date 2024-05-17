require("dotenv").config();
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
    secret: process.env.SESSION_SECRET,
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
  await mongoose.connect(process.env.DB_URL);
  console.log("Connected to MongoDB");
}

// helper functions

const isAuth = (req, res, done) => {
  req.user ? done() : res.send(401);
};

//routes

server.use("/products", isAuth, productRouter);
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

// serializeUser  and deserializeUser function

// Passport uses serializeUser function to persist user data (after successful authentication) into session. Function deserializeUser is used to retrieve user data from session.

passport.serializeUser(function (user, cb) {
  console.log("serialize");
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("deserialize", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

// connet the server to 8080 port
server.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
