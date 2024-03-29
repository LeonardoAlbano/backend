const { Router } = require('express');
const UserController = require('../controllers/UserController');

const userRoutes = Router();

const userController = new UserController();

userRoutes.get("/", userController.getUser);
userRoutes.post("/", userController.createUser);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);

module.exports = userRoutes;
