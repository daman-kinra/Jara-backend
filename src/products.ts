import express from "express";
const router = express.Router();
import users from "../models/users";
import projects from "../models/projects";

router.get("/home", async (req, res) => {
  const user = new users({
    name: `Daman ${Math.random()}`,
    age: `${Math.floor(Math.random() * 20)}`,
  });
  await user.save();
  res.json(user);
});
router.get("/", async (req, res) => {
  const project = await projects.findById("639c09abafbbf3811049e4cc").populate({
    path: "_users",
    match: { age: { $gt: 10 } },
    select: "age",
    options: {
      sort: { age: -1 },
    },
  });

  res.json(project);
});

export default router;
