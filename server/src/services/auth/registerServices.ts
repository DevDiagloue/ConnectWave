import User from "../../models/User/User";
import { IResult } from "../../utils/businessRules/IResult";

interface UserDto {
    userName: string;
    firstName: string;
    email: string;
    password: string;
  }

export const newUser =async (userDto:UserDto) => {
    const newUser = await User.create(userDto);
  
      const data = await newUser.save();
      return data   
}

export const emailExistsCheck = async (email: string): Promise<IResult> => {
    const userEmailExists = await User.findOne({ email });
  
    if (userEmailExists) {
      return {success:false,message: "Email already exists" };
    }
    return {success:true};
  };

export const userNameExistsCheck = async (userName: string): Promise<IResult> => {
    const userNameExists = await User.findOne({ userName });
  
    if (userNameExists) {
      return {success:false, message: "User Name already exists" };
    }
  
    return {success:true};
  };