import { Response } from "express";
import {
  handleErrorResponse,
  successResponse,
} from "../../utils/response/index.js";
import { userService } from "../../services/index.js";

class SubReddit {
  invokeCreateCommunity = () => {
    return async (req: any, res: Response) => {
      try {
        const userId = req?.user?._id;
        const reddit = await userService.createSubreddit(
          userId,
          req.validatedBody
        );
        return successResponse(
          res,
          201,
          "Successfully created a subreddit",
          reddit
        );
      } catch (error) {
        return handleErrorResponse(res, error);
      }
    };
  };

  invokeUpdateCommunity = () => {
    return async (req: any, res: Response) => {
      try {
        const userId = req?.user?._id;
        const subredditId = req?.params?.subredditId;
        const reddit = await userService.updateCommunity(
          userId,
          subredditId,
          req.validatedBody
        );
        return successResponse(
          res,
          201,
          "Successfully updated subreddit",
          reddit
        );
      } catch (error) {
        return handleErrorResponse(res, error);
      }
    };
  };
}

export default SubReddit;
