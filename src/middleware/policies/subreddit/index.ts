import { Response, NextFunction } from "express";
import SubReddit from "../../../models/subreddit.model.js";
import {
  errorResponse,
  handleErrorResponse,
} from "../../../utils/response/index.js";
import { UserError } from "../../../utils/response/errors.js";

export default class SubRedditPolicy {
  canManageCommunity = () => {
    return async (req: any, res: Response, next: NextFunction) => {
      try {
        const userId = req?.user?._id;
        const subredditId = req.params.subredditId;
        const subreddit = await SubReddit.findById(subredditId);
        if (!subreddit) {
          throw new UserError("subredditId is invalid");
        }
        //match the creator's userId with the userId of the client making the request
        if (userId?.toString() !== subreddit?.user?.toString()) {
          return errorResponse(
            res,
            403,
            "You are not authorized to manage this community"
          );
        }
        next();
      } catch (error) {
        return handleErrorResponse(res, error);
      }
    };
  };
}
