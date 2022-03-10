const User = require('../models/user');

module.exports = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({
      error: "Not authenticated."
    })
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: "Invalid user."
        })
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
};