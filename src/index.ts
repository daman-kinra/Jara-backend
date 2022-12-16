import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.get("/api", (req, res) => {
  res.send("-v0.0.1");
});

mongoose.connect(process.env.MONGODB_URL || "").then(() => {
  console.log("****DB CONNECTED****");
});

app.listen(PORT, () => console.log("****RUNNING****"));
