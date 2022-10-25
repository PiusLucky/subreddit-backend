import mongoose from "mongoose";
import winston from "winston";
import envConfig from "../../env.config.js";
import { AuditActions } from "../constant/enums/user/index.js";
import SubReddit from "../models/subreddit.model.js";
import UserService from "../services/user-service.js";
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

      const connection = mongoose.connection;

      connection.once("open", () => {
        this._logger.info("Starting up watch streams...");
        const subredditChangeStream = connection
          .collection("subredits")
          .watch();

        const subredditPostChangeStream = connection
          .collection("subreditposts")
          .watch();

        const subredditCommentChangeStream = connection
          .collection("subreditcomments")
          .watch();

        this._logger.info("Yada! All change streams are live");

        //Subreddit change streams
        subredditChangeStream.on("change", async (change) => {
          if (change.operationType === "insert") {
            switch (change.operationType) {
              case "insert":
                await new UserService().createAuditTrail(
                  AuditActions.Create,
                  "created subreddit",
                  change.fullDocument.user
                );
            }
          }

          if (change.operationType === "update") {
            switch (change.operationType) {
              case "update":
                const documentKey = change?.documentKey?._id;
                const updatedSubReddit = await SubReddit.findOne({
                  id: documentKey,
                });
                const userId = updatedSubReddit?.user?.toString();
                await new UserService().createAuditTrail(
                  AuditActions.Create,
                  "updated subreddit",
                  userId
                );
            }
          }
        });

        //SubredditPost change streams
        subredditPostChangeStream.on("change", async (change) => {
          if (change.operationType === "insert") {
            switch (change.operationType) {
              case "insert":
                await new UserService().createAuditTrail(
                  AuditActions.Create,
                  "created subreddit post",
                  change.fullDocument.user
                );
            }
          }
        });

        //SubredditComment change streams
        subredditCommentChangeStream.on("change", async (change) => {
          if (change.operationType === "insert") {
            switch (change.operationType) {
              case "insert":
                await new UserService().createAuditTrail(
                  AuditActions.Create,
                  "created comment in subredit post",
                  change.fullDocument.user
                );
            }
          }
        });
      });
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
