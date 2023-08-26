import mongoose, { Document } from "mongoose";
import moment from "moment";

interface User extends Document {
  userName: string;
  firstName: string;
  email: string;
  password: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new mongoose.Schema<User>({
  userName: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: {
    type: String,
    default: "",
    required: false,
  },
  createdAt: {
    type: String,
    default: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },
  updatedAt: {
    type: String,
    default: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },
});

const User = mongoose.model<User>("User", userSchema);

export default User;
