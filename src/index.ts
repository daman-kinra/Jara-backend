import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.get("/api", (req, res) => {
  res.send("-v0.0.1");
});

mongoose
  .connect(process.env.MONGODB_URL || "")
  .then(() => {
    console.log("****DB CONNECTED****");
  })
  .catch((err) => {
    console.log(`****${err.message}****`);
  });

app.listen(PORT, () => console.log("****RUNNING****"));
