const express = require("express");

const userController = require("../controller/users");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// CREATE
router.post("/users", verifyToken, userController.createNewUser);

// READ
router.get("/users", verifyToken, userController.getUsers);

// UPDATE
router.patch("/users/:id", userController.updateUser);

// UPDATE
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
