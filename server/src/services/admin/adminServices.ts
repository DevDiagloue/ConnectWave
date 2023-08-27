import User from '../../models/User/User'
import { IResult } from '../../utils/businessRules/IResult'
import { CustomError } from '../../errors/customError'
import { ErrorCodes } from '../../errors/errorCodes'

export const getUserId = async (id: string): Promise<IResult> => {
  const user = await User.findById(id)
  if (!user) {
    throw new CustomError(ErrorCodes.USER_NOT_FOUND)
  }
  return { success: true, data: user }
}