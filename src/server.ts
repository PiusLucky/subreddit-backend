import App from "./app.js";
import env from "../env.config.js";
import AuthController from "./controllers/auth.controller.js";
import InitialController from "./controllers/initial.controller.js";
import MongooseConnection from "./config/db.js";
import UserController from "./controllers/user.controller.js";

const app = new App({
  controllers: [
    new InitialController(),
    new AuthController(),
    new UserController(),
  ],
});

app.httpServer.listen(app.port, () => {
  MongooseConnection.getInstance().logger.info(
    `App listening on the port ${env.PORT}`
  );
});

export const appHttpServer = app.httpServer;
