import Joi from "joi";
import { PASSWORD_MATCH_REGEX } from "../constant/index.js";

export const LoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required().lowercase().trim(),
});

export const RegisterSchema = Joi.object({
  username: Joi.string().required().lowercase().trim(),
  password: Joi.string().required().min(8).pattern(PASSWORD_MATCH_REGEX),
  email: Joi.string().required().email().lowercase().trim(),
  ref: Joi.any().optional(),
});

export const ForgotPasswordSchema = Joi.object({
  email: Joi.string().required().email().lowercase().trim(),
});
