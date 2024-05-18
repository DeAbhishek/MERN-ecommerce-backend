const passport = require("passport");

// helper functions
exports.isAuth = () => passport.authenticate("jwt"); // this function now help to check the validity of the token

// Prevent to send sensitive data in front end
exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};
