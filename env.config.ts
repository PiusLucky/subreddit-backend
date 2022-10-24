import * as dotenv from "dotenv";
dotenv.config();

export default {
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "",
  MONGO_URI: process.env.VALOR_MONGO ?? "",
  FRONTEND_URL: process.env.FRONTEND_URL ?? "",
  STAGING_URL: process.env.STAGING_URL ?? "",
  PORT: process.env.PORT ?? "",
  NODE_ENV: process.env.NODE_ENV ?? "",
};