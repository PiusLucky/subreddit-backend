import morgan, { StreamOptions } from "morgan";
import envConfig from "../../env.config.js";
import MongooseConnection from "./db.js";

const stream: StreamOptions = {
  write: (message: string) => {
    const messageStatus = message.split(" ")[2].replace(/[\[\]']+/g, "");
    if (Number(messageStatus) !== 500) {
      return MongooseConnection.getInstance().logger.info(message);
    }
    return MongooseConnection.getInstance().logger.error(message);
  },
};

const skip = () => {
  const env = envConfig.NODE_ENV;
  return env !== "development";
};

const morganMiddleware = morgan(
  ":remote-addr :method [:status] :url :res[content-length] - :response-time ms",
  { stream, skip }
);

export default morganMiddleware;
