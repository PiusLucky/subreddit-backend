import mongoose, { Schema } from "mongoose";

const DiscardedTokenSchema: Schema = new Schema(
  {
    blockedJwtTokens: [String],
    userId: {
      type: mongoose.Types.ObjectId,
      required: "userId is required",
      ref: "User",
    },
  },
  { timestamps: true }
);

const DiscardedToken = mongoose.model("DiscardedToken", DiscardedTokenSchema);

export default DiscardedToken;
