import { Request, Response } from 'express'
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../helpers/token/generateToken'
import userLoginValidationSchema from '../../validations/auth/loginValidationSchema'
import BusinessRules from '../../utils/businessRules/BusinessRules'
import {
  checkPasswordIsWrong,
  findUserByEmail,
} from '../../services/auth/loginServices'
import { cookieOptions } from '../../helpers/token/cookieOptions'
import { CustomSuccess } from '../../handler/success/customSuccess'
import { SuccessCodes } from '../../handler/success/successCodes'
import { CustomError } from '../../handler/errors/customError'
import { ErrorCodes } from '../../handler/errors/errorCodes'
import Token from '../../models/Token/Token'

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const validationResult = await userLoginValidationSchema.safeParse(req.body)

    if (!validationResult.success) {
      throw new CustomError(ErrorCodes.INVALID_VALIDATION)
    }

    const user = await findUserByEmail(email)

    const businessResult = await BusinessRules(() =>
      checkPasswordIsWrong(password, user.password),
    )

    if (!businessResult) {
      return res.status(400).json({
        success: false,
        message: businessResult,
      })
    }

    const accessToken = await generateAccessToken(user)
    const refreshToken = await generateRefreshToken(user)

    // Refresh token'ı veritabanında sakla
    // const tokenDocument = new Token({ token: refreshToken, userId: user._id })
    // await tokenDocument.save()

    res.cookie('userJWT', accessToken, cookieOptions)
    res.cookie('refreshJWT', refreshToken, cookieOptions) // Refresh token'ı da güvenli bir şekilde saklayabilirsiniz.

    const successResponse = new CustomSuccess(SuccessCodes.OK, {
      message: SuccessCodes.OK.message,
      accessToken: accessToken,
      refreshToken: refreshToken,
    })

    return res.json(successResponse)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: true, message: error })
  }
}

export default { login }
