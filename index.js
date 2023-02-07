import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import videoRoute from "./routes/video.route.js";

dotenv.config();

const port = process.env.port || 5500;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/videos", videoRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
