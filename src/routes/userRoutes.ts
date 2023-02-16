import express from "express";
import { jwtValidator } from "../auth/jwtValidator";
import { userController } from "../controllers/userController";

export const router = express.Router();

//Register user on the database
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/all", jwtValidator, userController.getAllUsers);
router.get("/:id", jwtValidator, userController.getUserById);
router.patch("/:id", jwtValidator, userController.patchUserInfo);
router.delete("/:id", jwtValidator, userController.deleteUserById);
