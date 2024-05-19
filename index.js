require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");

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

const { isAuth, sanitizeUser } = require("./services/common");

//middleware

// session middleware
server.use(
  session({
    secret: process.env.SECRET_KEY,
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

//routes

server.use("/products", productRouter); // now middleware needs to call because the middleware is written as a normal function not as req res function
server.use("/categories", categoryRouter);
server.use("/brands", brandRouter);
server.use("/users", isAuth(), userRouter);
server.use("/auth", authRouter);
server.use("/cart", isAuth(), cartRouter);
server.use("/orders", isAuth(), orderRouter);

//Configure Password Local Strategy

passport.use(
  "local", //as a first argument write the strategy name to know which strategy is used
  // by default passwordJs uses username. By using usernameField we can chnage as per schema, no need to change schema
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email });
      // console.log(email, password, user);
      if (!user) {
        return done(null, false, { message: "invalid credentials" }); // for safety
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return done(null, false, { message: "invalid credentials" });
      }
      //CREATE TOKEN WITH jsonwebtoken

      const token = jwt.sign(sanitizeUser(user), process.env.SECRET_KEY);

      done(null, { token }); // this lines sends to serializer // token send into req.user object
    } catch (err) {
      done(err);
    }
  })
);

//JWT options

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

//Configure Password JWT Strategy

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user)); // this calls serializer
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

// serializeUser  and deserializeUser function

// Passport uses serializeUser function to persist user data (after successful authentication) into session. Function deserializeUser is used to retrieve user data from session.

passport.serializeUser(function (user, cb) {
  console.log("serialize");
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("deserialize");
  process.nextTick(function () {
    return cb(null, user);
  });
});

// connet the server to 8080 port
server.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
