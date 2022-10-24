import Joi from "joi";
import { CommunityTypes } from "../constant/enums/user/index.js";

export const CreateSubRedditSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  communityType: Joi.any().valid(...Object.values(CommunityTypes)),
  adultContent: Joi.boolean(),
});
