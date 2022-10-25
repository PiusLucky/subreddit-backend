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
        const subredditId = req?.params?.subredditId;
        const reddit = await userService.updateCommunity(
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

  invokeCreatePostInCommunity = () => {
    return async (req: any, res: Response) => {
      try {
        const subredditId = req?.params?.subredditId;
        const post = await userService.createPostInCommunity(
          subredditId,
          req.validatedBody
        );
        return successResponse(res, 201, "Post created successfully", post);
      } catch (error) {
        return handleErrorResponse(res, error);
      }
    };
  };

  invokeCreatePostComment = () => {
    return async (req: any, res: Response) => {
      try {
        const postId = req?.params?.postId;
        const post = await userService.createPostComment(
          postId,
          req.validatedBody
        );
        return successResponse(res, 201, "Comment created successfully", post);
      } catch (error) {
        return handleErrorResponse(res, error);
      }
    };
  };
}

export default SubReddit;
