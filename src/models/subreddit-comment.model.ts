import mongoose, { Schema } from "mongoose";

const SubRedditCommentSchema: Schema = new Schema({
  body: { type: String, required: true },
  post: {
    type: mongoose.Types.ObjectId,
    required: "postId is required",
    ref: "SubReditPost",
  },
});

const SubRedditComment = mongoose.model(
  "SubReditComment",
  SubRedditCommentSchema
);

export default SubRedditComment;
