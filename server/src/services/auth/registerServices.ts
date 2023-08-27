import User from "../../models/User/User";
import { IResult } from "../../utils/businessRules/IResult";
import { CustomError } from "../../errors/customError";
import { ErrorCodes } from "../../errors/errorCodes";

interface UserDto {
  userName: string;
  firstName: string;
  email: string;
  password: string;
}

export const newUser = async (userDto: UserDto) => {
  const newUser = await User.create(userDto);

  const data = await newUser.save();
  return data;
};

export const emailExistsCheck = async (email: string): Promise<IResult> => {
  const userEmailExists = await User.findOne({ email });

  if (userEmailExists) {
    throw new CustomError(ErrorCodes.EMAIL_EXISTS);
  }
  return { success: true };
};

export const userNameExistsCheck = async (
  userName: string
): Promise<IResult> => {
  const userNameExists = await User.findOne({ userName });

  if (userNameExists) {
    throw new CustomError(ErrorCodes.USERNAME_EXISTS);
  }

  return { success: true };
};
