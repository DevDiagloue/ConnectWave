import { Request, Response } from "express";

const logout = async (req: Request, res: Response) => {
  try {
    return res
      .clearCookie("userJWT")
      .status(200)
      .json({ error: false, message: "User Logout Successfully!" });
  } catch (error) {
    return res.status(500).json({ error: true, message: error });
  }
};

export default logout;
