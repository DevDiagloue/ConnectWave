import { Request, Response } from "express";
import userRegisterValidationSchema from "../../validations/registerValidationSchema";
import bcrypt from "bcrypt";
import BusinessRules from "../../utils/businessRules/BusinessRules";
import { emailExistsCheck, newUser, userNameExistsCheck } from "../../services/auth/registerServices";
import { z } from "zod";

const register = async (req: Request, res: Response) => {
  const { userName, firstName, email, password } = req.body;

  try {
   userRegisterValidationSchema.parse(req.body);

    const businessResult = await BusinessRules(
      () => emailExistsCheck(email),
      () => userNameExistsCheck(userName)
    );

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

    const userDto = {userName,firstName,email,password:hashPassword}
    const data = await newUser(userDto)

    return res
      .status(201)
      .json({ error: false, message: "User register successfull", data });
  } catch (error) {
    //validation error
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));
      return res.status(422).json({
        error: true,
        message: "Validation failed",
        data: formattedErrors,
      });
    } else {
      res.status(500).json({ error: true, message: error });
    }
  }
};

export default register;
