import express from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.port || 5500;
const app = express();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
