import App, { api } from "./app.js";
import env from "../env.config.js";
import AuthController from "./controllers/auth.controller.js";
import InitialController from "./controllers/initial.controller.js";
import MongooseConnection from "./config/db.js";

const app = new App({
  controllers: [new InitialController(), new AuthController()],
});

api.listen(app.port, () => {
  MongooseConnection.getInstance().logger.info(
    `App listening on the port ${env.PORT}`
  );
});

export const appHttpServer = app.httpServer;
