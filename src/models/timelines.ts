import { Schema, model } from "mongoose";

const timelneSchema = new Schema(
  {
    timelineTitle: {
      type: String,
      required: true,
    },
    projectID: { type: Schema.Types.ObjectId, ref: "projects", required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "users" }],
    creator: { type: Schema.Types.ObjectId, ref: "users", required: true },
    attachments: [{ type: String }],
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Timelines = model("timelines", timelneSchema);
export default Timelines;
