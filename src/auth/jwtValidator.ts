import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export function jwtValidator(req: Request, res: Response, next: NextFunction) {
  if (!!!req.headers["authorization-token"]) {
    return res.status(401).json({ error: "authorization-token required" });
  }
  jwt.verify(
    String(req.headers["authorization-token"]),
    process.env.SECRET_JWT!,
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      req.body.authorizationToken = decoded;
      next();
    }
  );
}
