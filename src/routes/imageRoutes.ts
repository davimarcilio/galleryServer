import express from "express";
import { jwtValidator } from "../auth/jwtValidator";
import { imageController } from "../controllers/imageController";

export const router = express.Router();

router.post("/upload", jwtValidator, imageController.uploadImage);
router.get("/:id", jwtValidator, imageController.getImagesByUserId);
router.delete("/:id", jwtValidator, imageController.DeleteImageById);
