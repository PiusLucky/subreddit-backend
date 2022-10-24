import { authService } from "./../../services/index.js";
import { Response } from "express";
import {
  handleErrorResponse,
  successResponse,
} from "../../utils/response/index.js";
import { RequestWithValidatedBody } from "../../interfaces/general/express.interface.js";

class SignUp {
  public invokeSignUp = () => {
    return async (req: RequestWithValidatedBody, res: Response) => {
      try {
        const user = await authService.createUser(req.validatedBody);
        return successResponse(res, 201, "Account created successfully", user);
      } catch (error) {
        return handleErrorResponse(res, error);
      }
    };
  };
}

export default SignUp;
