import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcrypt";
import userLoginValidationSchema from "../../validations/loginValidationSchema";

const login = async (req: Request, res: Response) => {
  let token;
  const { email, password } = req.body;

  try {
    const checkInputValidation = userLoginValidationSchema.parse(req.body);

    if (checkInputValidation) {
      return res.status(400).json({
        error: true,
        message: "Invalid data",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: true, message: "Email is wrong!" });
    }

    const checkPasswordIsWrong = await bcrypt.compare(password, user.password);
    if (!checkPasswordIsWrong) {
      return res
        .status(400)
        .json({ error: true, message: "Password is wrong!" });
    }

    res.cookie("userJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "lax", //cross-site cookie ** boolean | 'lax' | 'strict' | 'none' | undefined;
      maxAge: 24 * 60 * 60 * 1000, //maxAge = 1 day
      // signed: true
      // path?: string | undefined;
      // domain?: string | undefined;
    });

    return res.status(200).json({
      error: false,
      message: "User Login Succesfully!",
      data: user,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: error });
  }
};

export default login;
