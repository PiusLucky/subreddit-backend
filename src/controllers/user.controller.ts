import Controller from "../interfaces/controller.interface.js";
import { Router } from "express";
import { ValidatorMiddlewareFactory } from "../middleware/validations/validator.middleware.js";
import { SubRedditPostSchema, SubRedditSchema } from "../schemas/user.js";
import CheckAuth from "../middleware/checkauth.middleware.js";
import SubReddit from "./user/subreddit.js";
import SubRedditPolicy from "../middleware/policies/subreddit/index.js";

class UserController implements Controller {
  public path = "/subreddit";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      ValidatorMiddlewareFactory(SubRedditSchema),
      new CheckAuth().initializeMiddleware(),
      new SubReddit().invokeCreateCommunity()
    );

    this.router.put(
      `${this.path}/update/:subredditId`,
      ValidatorMiddlewareFactory(SubRedditSchema),
      new CheckAuth().initializeMiddleware(),
      new SubRedditPolicy().canManageCommunity(),
      new SubReddit().invokeUpdateCommunity()
    );

    this.router.post(
      `${this.path}/:subredditId/post/create`,
      ValidatorMiddlewareFactory(SubRedditPostSchema),
      new CheckAuth().initializeMiddleware(),
      new SubRedditPolicy().canManageCommunity(),
      new SubReddit().invokeCreatePostInCommunity()
    );

    this.router.post(
      `${this.path}/:postId/comment/create`,
      ValidatorMiddlewareFactory(SubRedditPostSchema),
      new CheckAuth().initializeMiddleware(),
      new SubReddit().invokeCreatePostComment()
    );
  }
}

export default UserController;
