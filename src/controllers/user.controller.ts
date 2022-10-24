import Controller from "../interfaces/controller.interface.js";
import { Router } from "express";
import { ValidatorMiddlewareFactory } from "../middleware/validations/validator.middleware.js";
import { CreateSubRedditSchema } from "../schemas/user.js";
import CheckAuth from "../middleware/checkauth.middleware.js";
import SubReddit from "./user/subreddit.js";

class UserController implements Controller {
  public path = "/subreddit";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      ValidatorMiddlewareFactory(CreateSubRedditSchema),
      new CheckAuth().initializeMiddleware(),
      new SubReddit().invokeCreateCommunity()
    );

    this.router.put(
      `${this.path}/update/:subredditId`,
      ValidatorMiddlewareFactory(CreateSubRedditSchema),
      new CheckAuth().initializeMiddleware(),
      new SubReddit().invokeUpdateCommunity()
    );
  }
}

export default UserController;
