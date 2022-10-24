import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import env from "../../env.config.js";
import DiscardedToken from "../models/discarded-token-model.js";
import { errorResponse } from "../utils/response/index.js";

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

        const userId = req?.user?._id;
        const discardedToken = await DiscardedToken.findOne({
          userId,
          blockedJwtTokens: { $eq: token },
        });

        if (discardedToken) {
          return errorResponse(res, 400, "Expired Token");
        }

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
