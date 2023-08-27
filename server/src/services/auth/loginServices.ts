import User from '../../models/User/User'
import IUser from '../../models/User/IUser'
import { IResult } from '../../utils/businessRules/IResult'
import { CustomError } from '../../errors/customError'
import { ErrorCodes } from '../../errors/errorCodes'
import bcrypt from 'bcrypt'

interface UserDto {
  email: string
  password: string
}

export const findUserByEmail = async (email: string): Promise<IUser> => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new CustomError(ErrorCodes.EMAIL_NOT_FOUND)
  }
  return user
}

export const checkPasswordIsWrong = async (
  password: string,
  userPassword: string,
): Promise<IResult> => {
  const checkPasswordIsWrong = await bcrypt.compare(password, userPassword)

  if (!checkPasswordIsWrong) {
    throw new CustomError(ErrorCodes.PASSWORD_IS_WRONG)
  }

  return { success: true }
}
