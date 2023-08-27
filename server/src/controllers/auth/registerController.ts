import { Request, Response } from "express";
import User from "../../models/User/User";
import userRegisterValidationSchema from "../../validations/registerValidationSchema";
import bcrypt from "bcrypt";
import { IResult } from "../../utils/businessRules/IResult";
import BusinessRules from "../../utils/businessRules/BusinessRules";

const emailExistsCheck = async (email: string): Promise<IResult> => {
  const userEmailExists = await User.findOne({ email });

  if (userEmailExists) {
    return { error: false, success: true, message: "Email already exists" };
  }
  return { success: true, error: false };
};

const userNameExistsCheck = async (userName: string): Promise<IResult> => {
  const userNameExists = await User.findOne({ userName });

  if (userNameExists) {
    return { error: false, success: true, message: "User Name already exists" };
  }

  return { success: true, error: false };
};

const register = async (req: Request, res: Response) => {
  const { userName, firstName, email, password } = req.body;

  try {
    userRegisterValidationSchema.parse(req.body);

    const businessResult = await BusinessRules(() => emailExistsCheck(email));
0
    if (businessResult) {
      return res.status(400).json({
        error: true,
        message: businessResult,
      });
    }

    const saltPassword = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltPassword);

    const newUser = await User.create({
      userName,
      firstName,
      email,
      password: hashPassword,
    });

    const data = await newUser.save();

    return res
      .status(201)
      .json({ error: false, message: "User register successfull", data });
  } catch (error) {
    return res.status(500).json({ error: true, message: error });
  }
};

export default register;
