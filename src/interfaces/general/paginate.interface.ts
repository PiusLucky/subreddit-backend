import { Response } from "express";

export interface Paginate {
  result?: any;
  next?: PaginateChild;
  previous?: PaginateChild;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}

export interface PaginateChild {
  page: number;
}

export interface PaginatedResponse extends Response {
  paginatedResults: any;
}
