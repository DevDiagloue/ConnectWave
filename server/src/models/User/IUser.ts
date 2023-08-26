import { Document } from "mongoose";

interface IUser extends Document {
  userName: string;
  firstName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export default IUser;
