import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
  name: String,
  age: Number,
});

const users = mongoose.model("users", userSchema);
export default users;
