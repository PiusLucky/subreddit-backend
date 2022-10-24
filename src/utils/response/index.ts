import { Response } from "express";
import {
  UserError,
  UserUnauthorizedError,
  UserConflictError,
  DataNotFoundError,
  ForbiddenError,
} from "./errors.js";

export const handleErrorResponse = (res: Response, error: any) => {
  let message: string, status: number;
  if (error instanceof UserError) {
    message = (error as any).message;
    status = 400;
  } else if (error instanceof UserUnauthorizedError) {
    message = (error as any).message;
    status = 403;
  } else if (error instanceof UserConflictError) {
    message = (error as any).message;
    status = 409;
  } else if (error instanceof DataNotFoundError) {
    message = (error as any).message;
    status = 404;
  } else if (error instanceof ForbiddenError) {
    message = (error as any).message;
    status = 403;
  } else {
    message = "Internal Server Error";
    status = 500;
  }
  return res.status(status).json({
    status,
    message,
  });
};

export const loginSuccessResponse = (
  res: Response,
  msg: string,
  user: any,
  token: string,
  code: number
) => {
  return res.status(code).json({
    msg,
    user,
    token,
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string
) => {
  return res.status(statusCode).json({
    status: statusCode,
    message,
  });
};
