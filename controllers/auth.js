const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(500).json({
          error: "Invalid login.",
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save((err) => {
              if (err) console.log(err);
            });
            return res.status(200).json({
              id: user._id,
              email: user.email,
            });
          }
          return res.status(500).json({
            error: "Invalid email or password.",
          });
        })
        .catch((err) => {
          return res.status(500).json({
            error: "Invalid login.",
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        error: "Invalid login.",
      });
    });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
      });
      user.save().then(
        (result) => {
          req.session.isLoggedIn = true;
          req.session.user = user;
          req.session.save((err) => {
            if (err) {
              return res.status(500).json({ error: "Failed to sign up." });
            }
            res.status(200).json({
              id: user._id,
              email: user.email,
            });
          });
        },
        (err) => {
          if (err.code === 11000) {
            return res.status(500).json({ error: "Email already exists." });
          }
          return res.status(500).json({ error: "Failed to sign up." });
        }
      );
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Failed to sign up." });
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    return res.status(200).json({ message: "Logged out." });
  });
};
