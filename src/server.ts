import express from "express";
import { router as userRoutes } from "./routes/userRoutes";
import { router as imageRoutes } from "./routes/imageRoutes";
import { router as authRoutes } from "./routes/authRoutes";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors({ origin: "*" }));
app.use("/user", express.json(), userRoutes);
app.use("/image", express.json(), imageRoutes);
app.use("/auth", express.json(), authRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
