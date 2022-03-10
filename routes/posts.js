const express = require("express");

const postController = require("../controllers/posts");

const router = express.Router();

const auth = require("../middleware/check-auth");

// get post (one/all)
router.get("/post/:id?", postController.getPost);

// create a post
router.post("/post", auth, postController.createPost);

// edit one's post
router.put("/post/:id", auth, postController.editPost);

// delete one's post
router.delete("/post/:id", auth, postController.deletePost);

// like a post 
router.put("/post/:id/like", auth, postController.likePost);

// unlike a post
router.put("/post/:id/unlike", auth, postController.unlikePost);

module.exports = router;
