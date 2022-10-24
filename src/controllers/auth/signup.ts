import { authService } from "./../../services/index.js";
import { Response } from "express";
import {
  handleErrorResponse,
  loginSuccessResponse,
} from "../../utils/response/index.js";

class SignUp {
  public invokeSignUp = () => {
    return async (req: any, res: Response) => {
      try {
        const user = await authService.createUser(req.validatedBody);
        return loginSuccessResponse(
          res,
          "Successfully registered.",
          user,
          "successful",
          201
        );
      } catch (error) {
        return handleErrorResponse(res, error);
      }
    };
  };
}

export default SignUp;
