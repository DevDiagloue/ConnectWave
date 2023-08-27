import IUser from "../../models/User/IUser";
import jwt from "jsonwebtoken";

export const generateToken = (user: IUser) => {
  try {
    const payload = {
      userId: user._id,
    };
    const key = process.env.ACCESS_TOKEN_USER_KEY;
    if (key === undefined || key === "" || key === null) {
      return Promise.reject("Something wrong with token key");
    }

    const accessToken = jwt.sign(payload, key, { expiresIn: "3d" });

    return Promise.resolve(accessToken);
  } catch (error) {
    return Promise.reject(error);
  }
};
