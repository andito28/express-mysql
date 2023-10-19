const express = require("express");

const authController = require("../controller/auth");

const router = express.Router();

//REGISTER
router.post("/register", authController.register);

module.exports = router;
