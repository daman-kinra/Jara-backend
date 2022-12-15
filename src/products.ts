import { resolveSoa } from "dns";
import express from "express";
const router = express.Router();
const obj = {};
router.get("/home", (req, res) => {
  console.log(obj.name.surname);
  res.send("Hello from home yess");
});
router.get("/", (req, res) => {
  res.send("Yooo");
});

export default router;
