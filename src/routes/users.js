const express = require("express");

const userController = require("../controller/users");

const router = express.Router();

// CREATE
router.post("/users", userController.createNewUser);

// READ
router.get("/users", userController.getUsers);

// UPDATE
router.patch("/users/:id", userController.updateUser);

// UPDATE
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
