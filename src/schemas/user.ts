import Joi from "joi";
import { CommunityTypes } from "../constant/enums/user/index.js";

export const SubRedditSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  communityType: Joi.any().valid(...Object.values(CommunityTypes)),
  adultContent: Joi.boolean(),
});

export const SubRedditPostSchema = Joi.object({
  body: Joi.string().required(),
});
