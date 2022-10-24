import { NextFunction, Response } from "express";
import Joi from "joi";
import { RequestWithValidatedBody } from "../../interfaces/general/express.interface.js";
import { errorResponse } from "../../utils/response/index.js";

export const ValidatorMiddlewareFactory =
  (schema: Joi.ObjectSchema<any>) =>
  async (req: RequestWithValidatedBody, res: Response, next: NextFunction) => {
    try {
      const validatedBody = await schema.validateAsync(req.body);
      req.validatedBody = validatedBody;
    } catch (error) {
      return errorResponse(res, 400, (error as any).message);
    }

    return next();
  };
