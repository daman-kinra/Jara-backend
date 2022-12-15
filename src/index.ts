import express from "express";
import router from "./products";
// import dotenv from "dotenv";

const PORT = process.env.PORT || 8080;
const app = express();

app.use("/api", router);

app.listen(PORT, () => console.log("****RUNNING****"));
