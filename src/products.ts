import express from "express";
const router = express.Router();

router.get("/home", (req, res) => {
  res.send("Hello from home");
});

export default router;
