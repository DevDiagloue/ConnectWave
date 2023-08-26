import { Request, Response } from "express";
import User from "../../models/User";
import userRegisterValidationSchema from "../../validations/registerValidationSchema";
import bcrypt from "bcrypt";

const registerController = async (req: Request, res: Response) => {
  const { userName, firstName, email, password, profilePicture } = req.body;

  try {
    const checkInputValidation = await userRegisterValidationSchema.parse(
      req.body
    );

    if (checkInputValidation) {
      return res.status(400).json({
        error: true,
        message: "Invalid data",
      });
    }

    const userEmailExists = await User.findOne({ email });

    if (userEmailExists) {
      return res.status(400).json({
        error: true,
        message: "Email already exists",
      });
    }

    const saltPassword = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltPassword);

    const newUser = await User.create({
      userName,
      firstName,
      email,
      password: hashPassword,
      profilePicture,
    });

    const data = await newUser.save();

    return res
      .status(201)
      .json({ error: false, message: "User register successfull", data });
  } catch (error) {
    return res.status(500).json({ error: true, message: error });
  }
};

export default registerController;
