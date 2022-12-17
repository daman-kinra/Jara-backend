import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./routes/auth";

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api", auth);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL || "", {})
  .then(() => {
    console.log("****DB CONNECTED****");
  })
  .catch((err) => {
    console.log(`****${err.message}****`);
  });

app.listen(PORT, () => console.log("****RUNNING****"));
