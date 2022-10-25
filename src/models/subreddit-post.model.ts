import mongoose, { Schema } from "mongoose";

const SubRedditPostSchema: Schema = new Schema({
  body: { type: String, required: true },
  subreddit: {
    type: mongoose.Types.ObjectId,
    required: "subredditId is required",
    ref: "SubRedit",
  },
});

const SubRedditPost = mongoose.model("SubReditPost", SubRedditPostSchema);

export default SubRedditPost;
