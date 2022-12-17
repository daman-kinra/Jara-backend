import { Schema, model } from "mongoose";

const commentsSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    commentedFor: {
      type: Schema.Types.ObjectId,
      ref: "tickets",
      required: true,
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "users" }],
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);
const Comments = model("comments", commentsSchema);
export default Comments;
