import { Request, Response, NextFunction } from 'express'
import BlackListToken from '../models/BlackListToken/BlackListToken'
import { CustomError } from '../handler/errors/customError'
import { ErrorCodes } from '../handler/errors/errorCodes'

export const checkBlackListedToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const blackListToken = req.cookies.userJWT

    const isBlacklisted = await BlackListToken.findOne({
      blackListToken: blackListToken,
    })

    if (isBlacklisted) {
      throw new CustomError(ErrorCodes.BLACKLIST_TOKEN)
    }

    next()
  } catch (error) {
    res.status(500).json({ error: true, message: error })
  }
}
