import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const errors = {
  emptyHeader: {
    message: "Authorization is not provided!",
  },
  tokenExpired: {
    message: "Session Expired!",
  },
  invalidToken: {
    message: "Invalid Token!",
  },
};

export interface IRequest extends Request {
  error?: {
    message: string;
  };
}
const isAuthorized = (req: IRequest, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization && typeof authorization !== "string") {
    req.error = { ...errors.emptyHeader };
    return next();
  }
  const token = authorization.split(" ")[1];
  try {
    const userData = jwt.verify(token, process.env.JWT_KEY);
    req.body = userData;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      req.error = { ...errors.tokenExpired };
      next();
    }
    req.error = { ...errors.invalidToken };
    next();
  }
};

export default isAuthorized;
