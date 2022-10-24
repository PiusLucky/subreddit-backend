import { IUser } from "./../interfaces/user.interface.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IRegister } from "../interfaces/user.interface.js";
import envConfig from "../../env.config.js";
import MongooseConnection from "../config/db.js";
import User from "../models/user.model.js";
import { UserError } from "../utils/response/errors.js";

export default class AuthService {
  async createUser(input: IRegister): Promise<any> {
    try {
      const { email, username, ref } = input;
      await AuthService.checkUserInputForDuplicate(email, username);
      const hash = await AuthService.hashPassword(input.password);
      input.password = hash;
      var refer = null;
      if (ref) {
        const checkRef = await User.findOne({
          $or: [{ "referral.code": ref }, { "referral.user": ref }],
        });
        if (checkRef) {
          refer = checkRef._id;
        }
      }

      let user: any = await User.create({
        email: email,
        password: hash,
        username: username,
        role: "regular",
      });

      return user;
    } catch (error) {
      throw new UserError(error as any);
    }
  }

  static checkUserInputForDuplicate = async (
    email: string,
    username: string
  ) => {
    const detailExists = await User.findOne({
      $or: [{ email: { $eq: email } }, { username: { $eq: username } }],
    });
    if (detailExists) {
      throw new UserError("Credential already exists");
    }
  };

  static hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };

  static comparePassword = async (
    passwordInput: string,
    userPassword: string
  ) => {
    const validPassword = await bcrypt.compare(passwordInput, userPassword);
    return validPassword;
  };

  static generateJwtToken = (user: any) => {
    try {
      const options = {
        expiresIn: envConfig.JWT_EXPIRES_IN || "1d",
      };

      const token = jwt.sign(
        {
          email: user.email,
          _id: user._id,
          username: user.username,
          role: user.role,
        },
        envConfig.JWT_SECRET,
        options
      );

      return token;
    } catch (error) {
      MongooseConnection.getInstance().logger.error(
        `AuthService: generateJwtToken error: ${error}`
      );
      return "";
    }
  };

  async getUserById(userId: string): Promise<any> {
    const user = await User.findById(userId);
    return user;
  }
}
