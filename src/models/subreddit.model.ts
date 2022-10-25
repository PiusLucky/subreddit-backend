import mongoose, { Schema } from "mongoose";
import { CommunityTypes } from "../constant/enums/user/index.js";

const SubRedditSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    communityType: {
      type: String,
      required: true,
      enum: Object.values(CommunityTypes),
    },
    adultContent: { type: Boolean, required: true },
    user: {
      type: mongoose.Types.ObjectId,
      required: "userId is required",
      ref: "User",
    },
  },
  { timestamps: true }
);

const SubReddit = mongoose.model("SubRedit", SubRedditSchema);

export default SubReddit;
