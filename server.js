import express from "express";
import dotenv from "dotenv";
dotenv.config();
import shortenRouter from "./src/routes/shortenUrl.js";
import connectDB from "./src/config/db.js";

const app = express();

app.use(express.json());

app.use("/", shortenRouter);

connectDB();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on ${port}..`);
});
