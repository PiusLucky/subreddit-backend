import { ErrorWithMessage } from "../interfaces/general/express.interface.js";
import {
  ICreateSubRedit,
  ICreateSubReditPost,
} from "../interfaces/user.interface.js";
import SubRedditComment from "../models/subreddit-comment.model.js";
import SubRedditPost from "../models/subreddit-post.model.js";
import SubReddit from "../models/subreddit.model.js";
import { UserError } from "../utils/response/errors.js";

export default class UserService {
  async createSubreddit(userId: string, input: ICreateSubRedit): Promise<any> {
    try {
      const redditNameAlreadyExist = await SubReddit.findOne({
        name: input.name,
      });

      if (redditNameAlreadyExist) {
        throw new UserError("Subreddit name already exist, use a unique name");
      }
      const reddit = await SubReddit.create({
        ...input,
        user: userId,
      });

      const populatedSubRedit = await SubReddit.findById(reddit?.id).populate({
        path: "user",
        select: "-password",
      });

      return populatedSubRedit;
    } catch (err) {
      throw new UserError((err as ErrorWithMessage)?.message);
    }
  }

  async updateCommunity(
    subredditId: string,
    input: ICreateSubRedit
  ): Promise<any> {
    try {
      await SubReddit.findOneAndUpdate(
        { _id: subredditId },
        {
          $set: input,
        },
        { upsert: true }
      );

      const updatedSubReddit = await SubReddit.findOne({
        id: subredditId,
      });
      return updatedSubReddit;
    } catch (err) {
      throw new UserError((err as ErrorWithMessage)?.message);
    }
  }

  async createPostInCommunity(
    subredditId: string,
    input: ICreateSubReditPost
  ): Promise<any> {
    try {
      const post = await SubRedditPost.create({
        ...input,
        subreddit: subredditId,
      });

      const populatedSubReditPost = await SubRedditPost.findById(
        post?.id
      ).populate({
        path: "subreddit",
      });
      return populatedSubReditPost;
    } catch (err) {
      throw new UserError((err as ErrorWithMessage)?.message);
    }
  }

  async createPostComment(
    postId: string,
    input: ICreateSubReditPost
  ): Promise<any> {
    try {
      const post = await SubRedditPost.findById(postId);

      if (!post) {
        throw new UserError("Invalid postId");
      }

      const comment = await SubRedditComment.create({
        ...input,
        post: postId,
      });

      const populatedSubReditComment = await SubRedditComment.findById(
        comment?.id
      ).populate({
        path: "post",
        select: "subreddit",
        populate: {
          path: "subreddit",
        },
      });
      return populatedSubReditComment;
    } catch (err) {
      throw new UserError((err as ErrorWithMessage)?.message);
    }
  }
}
