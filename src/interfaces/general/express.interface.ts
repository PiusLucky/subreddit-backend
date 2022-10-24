import { Request } from "express";

export interface RequestData extends Request {
  user?: any;
}

export interface RequestWithUserHeader extends RequestData {
  user: any;
  headers: any;
}

export interface ErrorResponse extends Error {
  response?: any;
}

export interface RequestWithValidatedBody extends Request {
  validatedBody?: any;
}

export interface ErrorWithCode extends Error {
  code: number;
}

export interface ErrorWithMessage extends Error {
  message: string;
}

export interface ErrorWithName extends Error {
  name: string;
}

export interface RequestWithUserQuery extends RequestData {
  query: {
    id: string;
  };
}

export interface RequestWithQuery extends Request {
  query: {
    page?: string;
    limit?: string;
  };
}

export interface IRequestWithQuery extends Request {
  query: {
    from?: string;
    to?: string;
  };
}

export interface RequestInfo extends Request {
  user?: any;
}
