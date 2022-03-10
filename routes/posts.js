const express = require("express");

const postController = require("../controllers/posts");

const router = express.Router();

const auth = require("../middleware/check-auth");

// get post (one/all)
router.get("/post/:id?", postController.getPost);

// create a post
router.post("/post", auth, postController.createPost);

// delete one's post
router.delete("/post/:id", auth, postController.deletePost);

module.exports = router;
