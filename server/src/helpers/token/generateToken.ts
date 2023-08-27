import IUser from "../../models/User/IUser";
import jwt from "jsonwebtoken";

export const generateToken = (user: IUser) => {
  try {
    const payload = {
      userId: user._id,

    };
    const key = process.env.ACCESS_TOKEN_USER_KEY;
  } catch (error) {}
};
