import express from "express";
// import dotenv from "dotenv";

const PORT = process.env.PORT || 8080;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => console.log("****RUNNING****"));
