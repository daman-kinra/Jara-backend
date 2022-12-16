import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    teamMembers: [{ type: Schema.Types.ObjectId, ref: "users" }],
    manager: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

const Projects = model("projects", projectSchema);
export default Projects;
