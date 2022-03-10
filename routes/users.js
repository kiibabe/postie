const express = require("express");

const userController = require("../controllers/users");

const router = express.Router();

const auth = require("../middleware/check-auth");

// get user (one/all)
router.get("/user/:id?", auth, userController.getUsers);

//get posts of a certain user
router.get("/user/:id/posts", auth, userController.getUserPosts);

// edit user info (only the logged in user's self)
router.put("/user", auth, userController.editUser);

module.exports = router;
