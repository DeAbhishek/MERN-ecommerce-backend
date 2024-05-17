// helper functions

exports.isAuth = (req, res, done) => {
  req.user ? done() : res.send(401);
};


// Prevent to send sensitive data in front end
exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};
