import { RequestWithValidatedBody } from "./../../interfaces/general/express.interface.js";
import { Response } from "express";
import AuthService from "../../services/auth-service.js";
import { UserRoles } from "../../constant/enums/user/index.js";
import { UserError } from "../../utils/response/errors.js";
import {
  handleErrorResponse,
  loginSuccessResponse,
} from "../../utils/response/index.js";
import User from "../../models/user.model.js";

class Login {
  public invokeLogin = () => {
    return async (req: RequestWithValidatedBody, res: Response) => {
      const { ip, device } = req.headers;
      let token;

      try {
        const { email, password } = req.validatedBody;
        const role = UserRoles.Regular;
        const user = await User.findOne({ email, role });

        const isPasswordValid = await AuthService.comparePassword(
          password,
          user?.password
        );

        if (!user || !isPasswordValid) {
          throw new UserError("Email or Password Invalid.");
        }

        const token: string = AuthService.generateJwtToken(user.id);
        return loginSuccessResponse(
          res,
          "User logged in successfully!",
          user,
          token,
          200
        );
      } catch (error) {
        return handleErrorResponse(res, error);
      }
    };
  };
}

export default Login;
