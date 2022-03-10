const express = require("express");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

// log in
router.post("/login", authController.postLogin);

// sign up
router.post("/signup", authController.postSignup);

// log out
router.post("/logout", authController.postLogout);

module.exports = router;
