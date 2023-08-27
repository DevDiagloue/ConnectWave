import { Request, Response } from "express";
import User from "../../models/User/User";
import bcrypt from "bcrypt";
import { generateToken } from "../../helpers/token/generateToken";
import userLoginValidationSchema from "../../validations/loginValidationSchema";
import BusinessRules from "../../utils/businessRules/BusinessRules";
import {
  checkPasswordIsWrong,
  findUserByEmail,
} from "../../services/auth/loginServices";
import IUser from "../../models/User/IUser";

const login = async (req: Request, res: Response) => {
  let token;
  const { email, password } = req.body;

  try {
    await userLoginValidationSchema.parse(req.body);

    const user = await findUserByEmail(email);

    const businessResult = await BusinessRules(() =>
      checkPasswordIsWrong(password, user.password)
    );

    if (businessResult) {
      return res.status(400).json({
        success: false,
        message: businessResult,
      });
    }

    token = await generateToken(user);

    res.cookie("userJWT", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", //cross-site cookie ** boolean | 'lax' | 'strict' | 'none' | undefined;
      maxAge: 24 * 60 * 60 * 1000, //maxAge = 1 day
      // signed: true
      // path?: string | undefined;
      // domain?: string | undefined;
    });

    return res.status(200).json({
      error: false,
      message: "User Login Succesfully!",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: error });
  }
};

export default login;
