const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const user = req.user;

  const postObject = new Post({
    user: user._id,
    email: user.email,
    title: title,
    content: content,
    postedDate: Date.now(),
  });

  postObject
    .save()
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.id;

  if (postId) {
    Post.findOne({ _id: postId }, (err, post) => {
      if (!post) {
        return res.status(404).json({
          error: "Post not found.",
        });
      }
      if (err) {
        res.status(500).json({
          error: err,
        });
      }
      return res.status(200).json(post);
    });
  } else {
    Post.find({}, (err, posts) => {
      if (!posts) {
        return res.status(404).json({
          error: "No posts to show.",
        });
      }
      if (err) {
        res.status(500).json({
          error: err,
        });
      }
      return res.status(200).json(posts);
    });
  }
};

exports.editPost = (req, res, next) => {
  const postId = req.params.id;
  const user = req.user;
  const updateQuery = {};
  if (req.body.title) {
    updateQuery.title = req.body.title;
  }
  if (req.body.content) {
    updateQuery.content = req.body.content;
  }

  Post.findOneAndUpdate(
    { _id: postId, user: user._id },
    updateQuery,
    (err, post) => {
      if (!post) {
        return res.status(404).json({
          error: "Post not found.",
        });
      }
      if (err) {
        res.status(500).json({
          error: err,
        });
      }
      return res.status(200).json({
        message: "Updated post.",
      });
    }
  );
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.id;
  const user = req.user;

  Post.findOneAndDelete({ _id: postId, user: user._id }, (err, post) => {
    if (!post) {
      return res.status(404).json({
        error: "Post not found.",
      });
    }
    if (err) {
      res.status(500).json({
        error: err,
      });
    }
    return res.status(200).json({
      message: "Deleted post.",
    });
  });
};

exports.likePost = (req, res, next) => {
  const postId = req.params.id;
  const user = req.user;

  Post.updateOne(
    { _id: postId },
    { $addToSet: { likes: user._id } },
    (err, post) => {
      if (!post) {
        return res.status(404).json({
          error: "Post not found.",
        });
      }
      if (err) {
        res.status(500).json({
          error: err,
        });
      }
      return res.status(200).json({
        message: "Liked post.",
      });
    }
  );
};

exports.unlikePost = (req, res, next) => {
  const postId = req.params.id;
  const user = req.user;

  Post.updateOne(
    { _id: postId },
    { $pull: { likes: user._id } },
    (err, post) => {
      if (!post) {
        return res.status(404).json({
          error: "Post not found.",
        });
      }
      if (err) {
        res.status(500).json({
          error: err,
        });
      }
      return res.status(200).json({
        message: "Unliked post.",
      });
    }
  );
};
