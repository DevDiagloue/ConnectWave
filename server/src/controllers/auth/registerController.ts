import { Request, Response } from "express";
import userRegisterValidationSchema from "../../validations/registerValidationSchema";
import bcrypt from "bcrypt";
import BusinessRules from "../../utils/businessRules/BusinessRules";
import {
  emailExistsCheck,
  newUser,
  userNameExistsCheck,
} from "../../services/auth/registerServices";

const register = async (req: Request, res: Response) => {
  const { userName, firstName, email, password } = req.body;

  try {
    await userRegisterValidationSchema.parse(req.body);

    const businessResult = await BusinessRules(
      () => userNameExistsCheck(userName),
      () => emailExistsCheck(email)
    );

    if (businessResult) {
      return res.status(400).json({
        success: false,
        message: businessResult,
      });
    }

    const saltPassword = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltPassword);

    const userDto = { userName, firstName, email, password: hashPassword };
    const data = await newUser(userDto);

    return res
      .status(201)
      .json({ error: false, message: "User register success", data });
  } catch (error) {
    return res.status(500).json({ error: true, message: error });
  }
};

export default register;
