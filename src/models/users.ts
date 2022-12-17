import { Schema, model } from "mongoose";

export interface IUser {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  avatar?: string;
  displayName: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const Users = model("users", userSchema);
export default Users;
