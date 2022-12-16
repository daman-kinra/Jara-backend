import express from "express";
import router from "./products";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use("/api", router);

mongoose.connect(process.env.MONGODB_URL || "").then(() => {
  console.log("****DB CONNECTED****");
});

app.listen(PORT, () => console.log("****RUNNING****"));
