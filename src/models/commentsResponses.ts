import { Schema, model } from "mongoose";

const responseSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    respondedFor: {
      type: Schema.Types.ObjectId,
      ref: "comments",
      required: true,
    },
  },
  { timestamps: true }
);

const Responses = model("commentsResponses", responseSchema);
export default Responses;
