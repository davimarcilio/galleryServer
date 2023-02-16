import express from "express";
import { jwtValidator } from "../auth/jwtValidator";
import { userController } from "../controllers/userController";

export const router = express.Router();

//Register user on the database
router.post("/register", userController.registerUser);

//Login user
router.post("/login", userController.loginUser);

//Get all users
router.get("/all", jwtValidator, userController.getAllUsers);

//Get unique user
router.get("/:id", jwtValidator, userController.getUserById);

//Patch unique user
router.patch("/:id", jwtValidator, userController.patchUserInfo);

//Delete unique user
router.delete("/:id", jwtValidator, userController.deleteUserById);
