import express, { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  try {
    const header = req.headers["authorization-token"];
    if (!!!header) {
      return res.status(400).json({ message: "Header not found" });
    }
    jwt.verify(String(header), process.env.SECRET_JWT!, (err, decoded) => {
      if (err) {
        console.log(err);

        return res.status(401).json({ message: "Unauthorized" });
      }
      return res.status(200).json(decoded);
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
