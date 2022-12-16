import { Schema, model } from "mongoose";

const tasksSchema = new Schema(
  {
    taskTitle: {
      type: String,
      required: true,
    },
    projectID: { type: Schema.Types.ObjectId, ref: "projects", required: true },
    assignedTo: [{ type: Schema.Types.ObjectId, ref: "users" }],
    creator: { type: Schema.Types.ObjectId, ref: "users", required: true },
    attachments: [{ type: String }],
    status: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
const Tasks = model("tasks", tasksSchema);
export default Tasks;
