import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";
import isAuthorized, { IRequest } from "../middlewares/authMiddleware";
import Users, { IUser } from "../models/users";

const router: Router = express.Router();

const saltRounds = 10;

const authRoutes = {
  login: "/login",
  signup: "/signup",
  checkLogin: "/checkLogin",
};

const errors = {
  emptyPayload: {
    message: "Payload is empty!",
  },
  userNotFound: {
    message: "User not found!",
  },
  wrongMongoObjectId: {
    message: "MongoDB id provided is wrong!",
  },
  wrongPassword: {
    message: "Password does not match!",
  },
};

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email().lowercase(),
  displayName: Joi.string().required(),
  password: Joi.string().required().min(6),
  avatar: Joi.string(),
});
const loginSchema = Joi.object({
  email: Joi.string().required().email().lowercase(),
  password: Joi.string().required().min(6),
});

const responseUser = (user: IUser) => ({
  _id: user._id,
  email: user.email,
  displayName: user.displayName,
  name: user.name,
  avatar: user.avatar,
});

router.post(authRoutes.login, async (req: Request, res: Response) => {
  try {
    const validate = await loginSchema.validate(req.body);
    if (validate.error) throw validate.error;
    const { email, password } = validate.value;
    const user = await Users.findOne({ email }).select("+password");
    if (user === null) {
      return res.status(400).json(errors.userNotFound);
    }
    const doesPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!doesPasswordMatch) throw errors.wrongPassword;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ ...responseUser(user), token });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post(authRoutes.signup, async (req: Request, res: Response) => {
  try {
    const validate = await signupSchema.validate(req.body);
    if (validate.error) throw validate.error;
    const { email, password, displayName, name, avatar = "" } = validate.value;
    const hash = bcrypt.hashSync(password, saltRounds);
    const user = await Users.create({
      name,
      displayName,
      email,
      password: hash,
      avatar,
    });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ ...responseUser(user), token });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get(
  authRoutes.checkLogin,
  isAuthorized,
  async (req: IRequest, res: Response) => {
    try {
      if (req.error) throw req.error;
      const user = await Users.findOne({ _id: req.body._id });
      if (user === null) return res.status(400).json(errors.userNotFound);
      return res.status(200).json({ ...responseUser(user) });
    } catch (err) {
      if (err.name === "CastError") {
        return res.status(400).json(errors.wrongMongoObjectId);
      }
      return res.status(401).json(err);
    }
  }
);

export default router;
