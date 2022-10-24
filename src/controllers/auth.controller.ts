import Controller from "../interfaces/controller.interface.js";
import { Router } from "express";
import Login from "./auth/login.js";
import SignUp from "./auth/signup.js";
import { ValidatorMiddlewareFactory } from "../middleware/validations/validator.middleware.js";
import { LoginSchema, RegisterSchema } from "../schemas/auth.js";
import Logout from "./auth/logout.js";
import CheckAuth from "../middleware/checkauth.middleware.js";

class AuthenticationController implements Controller {
  public path = "/auth";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      ValidatorMiddlewareFactory(LoginSchema),
      new Login().invokeLogin()
    );
    this.router.post(
      `${this.path}/register`,
      ValidatorMiddlewareFactory(RegisterSchema),
      new SignUp().invokeSignUp()
    );

    this.router.post(
      `${this.path}/logout`,
      new CheckAuth().initializeMiddleware(),
      new Logout().invokeLogout()
    );
  }
}

export default AuthenticationController;
