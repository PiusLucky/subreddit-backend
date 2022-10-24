import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import env from "../../env.config.js";

class CheckAuth {
  constructor() {
    this.initializeMiddleware();
  }
  public initializeMiddleware = () => {
    return async (req: any, res: Response, next: NextFunction) => {
      try {
        const token = req?.headers?.authorization?.split(" ")[1] || "";
        const decoded = jwt.verify(token, env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (error) {
        if ((error as Error).message === "jwt expired") {
          return res.status(400).json({
            status: 400,
            message: "Jwt expired",
          });
        } else {
          return res.status(401).json({
            status: 401,
            message: "Auth failed",
          });
        }
      }
    };
  };
}

export default CheckAuth;
