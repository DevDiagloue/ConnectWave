import User from '../../models/User/User'
import IUser from '../../models/User/IUser'
import { IResult } from '../../utils/businessRules/IResult'
import { CustomError } from '../../handler/errors/customError'
import { ErrorCodes } from '../../handler/errors/errorCodes'
import BlackListToken from '../../models/BlackListToken/BlackListToken'

interface BlackListTokenDto {
  blackListToken: string
  expireDate: Date
}

export const addTokenToBlacklistService = async (
  blackListTokenDto: BlackListTokenDto,
) => {
  const blackListedToken = await BlackListToken.create(blackListTokenDto)
  return blackListedToken
}
