import Controller from "../interfaces/controller.interface.js";
import { Router } from "express";
import { Request, Response } from "express";

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
  }
}

export default InitialController;
