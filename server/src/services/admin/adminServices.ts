import User from '../../models/User/User'
import { IResult } from '../../utils/businessRules/IResult'
import { CustomError } from '../../handler/errors/customError'
import { ErrorCodes } from '../../handler/errors/errorCodes'

export const getUserByIdService = async (id: string): Promise<IResult> => {
  const user = await User.findById(id)
  if (!user) {
    throw new CustomError(ErrorCodes.USER_NOT_FOUND)
  }
  return { success: true, data: user }
}

export const getAllUserService = async (
  page: number,
  pageSize: number,
): Promise<IResult> => {
  const allUsers = await User.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort('-createdAt')

  if (!allUsers) {
    throw new CustomError(ErrorCodes.USER_NOT_FOUND)
  }
  return { success: true, data: allUsers }
}
