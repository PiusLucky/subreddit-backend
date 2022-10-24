import env from "../../env.config.js";

class Domains {
  public corsOptions = {
    origin: [env.FRONTEND_URL, env.STAGING_URL],
    credentials: true,
  };
  public allowedMethods = ["GET", "POST", "PUT", "PATCH"];
}

export default Domains;
