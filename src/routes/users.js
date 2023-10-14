const express = require("express");

const userController = require("../controller/users");

const router = express.Router();

// CREATE
router.post("/", userController.createNewUser);

// READ
router.get("/", userController.getUsers);

// UPDATE
router.patch("/:id", userController.updateUser);

// UPDATE
router.delete("/:id", userController.deleteUser);

module.exports = router;
