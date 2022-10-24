import { ErrorWithMessage } from "../interfaces/general/express.interface.js";
import { ICreateSubRedit, ISubReddit } from "../interfaces/user.interface.js";
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
    userId: string,
    subredditId: string,
    input: ICreateSubRedit
  ): Promise<any> {
    try {
      const redditNameAlreadyExist = await SubReddit.findOne({
        name: input.name,
      });

      console.log(redditNameAlreadyExist);

      if (redditNameAlreadyExist) {
        throw new UserError("Subreddit name already exist, use a unique name");
      }
      const reddit = await SubReddit.create({
        ...input,
        userId,
      });

      return reddit;
    } catch (err) {
      console.log(err);
      throw new UserError((err as ErrorWithMessage)?.message);
    }
  }
}
