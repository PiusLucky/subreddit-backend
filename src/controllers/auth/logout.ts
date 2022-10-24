import { authService } from "./../../services/index.js";
import { Response } from "express";
import {
  handleErrorResponse,
  successResponse,
} from "../../utils/response/index.js";
import { RequestWithUserHeader } from "../../interfaces/general/express.interface.js";

class Logout {
  public invokeLogout = () => {
    return async (req: any, res: Response) => {
      try {
        const userId = req?.user?._id;
        const token = req?.headers?.authorization.split(" ")[1];
        const user = await authService.logout(userId, token);
        return successResponse(
          res,
          200,
          "User logged out successfully, token has been discarded!",
          user
        );
      } catch (error) {
        return handleErrorResponse(res, error);
      }
    };
  };
}

export default Logout;
