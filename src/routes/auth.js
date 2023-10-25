const express = require("express");

const authController = require("../controller/auth");

const router = express.Router();

//REGISTER
router.post("/register", authController.register);

//Login
router.get("/login", authController.login);

//refresh token
router.get("/token", authController.refreshToken);

//Logout
router.get("/logout", authController.logout);

module.exports = router;
