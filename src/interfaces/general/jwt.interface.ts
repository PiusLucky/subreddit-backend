import * as jwt from "jsonwebtoken";

export interface IJwt extends jwt.JwtPayload {
  email: string;
  _id: string;
  username: string;
  role: string;
}
