import express from "express";
const router = express.Router();
const obj = {};
router.get("/home", (req, res) => {
  console.log(obj.name.surname);
  res.send("Hello from home yess");
});

export default router;
