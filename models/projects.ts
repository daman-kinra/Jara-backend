import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new Schema({
  _users: [{ type: Schema.Types.ObjectId, ref: "users" }],
});
const projects = mongoose.model("projects", projectSchema);
export default projects;
