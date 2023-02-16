import express from "express";
import { jwtValidator } from "../auth/jwtValidator";
import { imageController } from "../controllers/imageController";

export const router = express.Router();
//Upload a image info on database
router.post("/upload", jwtValidator, imageController.uploadImage);

//get Images by user id
router.get("/:id", jwtValidator, imageController.getImagesByUserId);

//Delete image from imageId
router.delete("/:id", jwtValidator, imageController.DeleteImageById);
