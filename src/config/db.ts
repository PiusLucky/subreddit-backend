import mongoose from "mongoose";
import winston from "winston";
import envConfig from "../../env.config.js";
import { isTestingEnvironment } from "../utils/environment.js";

//Using singleton for optimization
class MongooseConnection {
  private readonly _logger: winston.Logger;
  private readonly _env: string;
  private static _instance: MongooseConnection;

  private constructor(DB_URL = envConfig.MONGO_URI) {
    this._env = process.env.NODE_ENV || "testing";
    this._logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        ...(this._env === "development" || isTestingEnvironment
          ? [new winston.transports.Console()]
          : [
              new winston.transports.File({
                filename: "logs/error.log",
                level: "error",
              }),
              new winston.transports.File({ filename: "logs/combined.log" }),
            ]),
      ],
    });

    (async () => {
      mongoose
        .connect(DB_URL)
        .then(() => {
          this._logger.info("MongoDB connection established successfully");
        })
        .catch((e: mongoose.Error) =>
          this._logger.error(`MongoDB connection failed with error: ${e}`)
        );
    })();
  }

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new MongooseConnection();
    return this._instance;
  }

  public get logger() {
    return this._logger;
  }
}

export default MongooseConnection;
