const Post = require("../models/post");
const User = require("../models/user");

exports.getUsers = (req, res, next) => {
  const userId = req.params.id;

  if (userId) {
    User.findOne({ _id: userId })
      .select("-password")
      .exec((err, user) => {
        if (!user) {
          return res.status(404).json({
            error: "User not found.",
          });
        }
        if (err) {
          res.status(500).json({
            error: err,
          });
        }
        return res.status(200).json(user);
      });
  } else {
    User.find({})
      .select("-password")
      .exec((err, users) => {
        if (!users) {
          return res.status(404).json({
            error: "No posts to show.",
          });
        }
        if (err) {
          res.status(500).json({
            error: err,
          });
        }
        return res.status(200).json(users);
      });
  }
};

exports.getUserPosts = (req, res, next) => {
  const userId = req.params.id;

  Post.find({ user: userId }, (err, posts) => {
    if (!posts) {
      return res.status(404).json({
        error: "No posts to display.",
      });
    }
    if (err) {
      res.status(500).json({
        error: err,
      });
    }
    return res.status(200).json(posts);
  });
};
