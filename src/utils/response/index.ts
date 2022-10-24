import { Response } from "express";
import {
  UserError,
  UserUnauthorizedError,
  UserConflictError,
  DataNotFoundError,
  ForbiddenError,
} from "./errors.js";

interface IResponseMeta {
  statusCode: number;
  message: string;
  error: Boolean;
  errorCode?: string;
  token?: string;
}

export interface IPaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface IResponse {
  meta: IResponseMeta;
  data?: any;
  pagination?: IPaginationResponse;
}

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

export const successResponse = (
  res: Response,
  statusCode: number,
  message = "Success",
  data?: any,
  pagination?: IPaginationResponse
) => {
  const attachedResponse: any = {};
  if (data) {
    attachedResponse["data"] = data;
  } else {
    attachedResponse["data"] = {};
  }
  if (pagination) attachedResponse["pagination"] = pagination;
  return res.status(statusCode).json(<IResponse>{
    meta: {
      statusCode,
      message,
      error: false,
    },
    ...attachedResponse,
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
