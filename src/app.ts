import cors from "cors";
import * as dotenv from "dotenv";
import helmet from "helmet";
import { dirname } from "path";
import Domains from "./config/allowed.domains.js";
import express, { Request, Response, Application, NextFunction } from "express";
import Controller from "./interfaces/controller.interface.js";
import morganMiddleware from "./config/morgan.js";
import MongooseConnection from "./config/db.js";
import envConfig from "../env.config.js";

dotenv.config();

export const api = express();

class App {
  public app: Application;
  public port: number;
  public httpServer: any;
  private domains: any;

  constructor({ controllers }: { controllers: Controller[] }) {
    this.domains = new Domains();
    this.app = express();
    this.port = Number(envConfig.PORT);
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeFallback();
  }

  private connectToTheDatabase() {
    MongooseConnection.getInstance();
  }

  private initializeMiddlewares() {
    this.app.use(helmet());
    this.app.use(morganMiddleware);
    this.app.use(cors(this.domains.corsOptions));
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ limit: "50mb", extended: false }));
    this.app.use("/public", express.static(dirname + "/public/"));
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/api/v2/", controller.router);
    });
  }

  private initializeFallback() {
    this.app.use(function (_req: Request, res: Response) {
      return res.status(404).json({ status: 404, message: "Not found" });
    });
  }
  nativeApp() {
    return this.app;
  }
}

export default App;
