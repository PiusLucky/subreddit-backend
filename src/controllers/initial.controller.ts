import Controller from "../interfaces/controller.interface.js";
import { Router } from "express";
import { Request, Response } from "express";
import CheckAuth from "../middleware/checkauth.middleware.js";
import PaginateModel from "../middleware/paginate.middleware.js";
import AuditTrail from "../models/audit-trail.model.js";
import SubReddit from "./user/subreddit.js";

class InitialController implements Controller {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", (req: Request, res: Response) => {
      return res.status(200).json({
        status: 200,
        data: "Welcome to Subreddit Version 0.0.1",
      });
    });

    this.router.get("/ping", (req: Request, res: Response) => {
      return res.status(200).json({
        status: 200,
        ping: "pong",
        data: new Date(),
      });
    });

    this.router.get(
      `/audit`,
      new CheckAuth().initializeMiddleware(),
      new PaginateModel().invokePaginateModel(AuditTrail),
      new SubReddit().invokeViewAuditLog()
    );
  }
}

export default InitialController;
