import { Request, Response } from 'express'
import { generateToken } from '../../helpers/token/generateToken'
import userLoginValidationSchema from '../../validations/auth/loginValidationSchema'
import BusinessRules from '../../utils/businessRules/BusinessRules'
import {
  checkPasswordIsWrong,
  findUserByEmail,
} from '../../services/auth/loginServices'
import { cookieOptions } from '../../helpers/token/cookieOptions'
import { CustomSuccess } from '../../handler/success/customSuccess'
import { SuccessCodes } from '../../handler/success/successCodes'

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const validationResult = await userLoginValidationSchema.safeParse(req.body)

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Validation',
      })
    }

    const user = await findUserByEmail(email)

    console.log('user typeof', typeof user)

    const businessResult = await BusinessRules(() =>
      checkPasswordIsWrong(password, user.password),
    )

    if (!businessResult) {
      return res.status(400).json({
        success: false,
        message: businessResult,
      })
    }

    const token = await generateToken(user)

    res.cookie('userJWT', token, cookieOptions)

    const successResponse = new CustomSuccess(SuccessCodes.OK, {
      message: SuccessCodes.OK.message,
      token: token,
    })

    return res.json(successResponse)
  } catch (error) {
    return res.status(500).json({ error: true, message: error })
  }
}

export default { login }
