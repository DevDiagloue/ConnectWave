import { Request, Response } from 'express'
import { generateToken } from '../../helpers/token/generateToken'
import userLoginValidationSchema from '../../validations/auth/loginValidationSchema'
import BusinessRules from '../../utils/businessRules/BusinessRules'
import {
  checkPasswordIsWrong,
  findUserByEmail,
} from '../../services/auth/loginServices'
import { cookieOptions } from '../../helpers/token/cookieOptions'

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    await userLoginValidationSchema.parse(req.body)

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

    const token = await generateToken(user)

    res.cookie('userJWT', token, cookieOptions)

    return res.status(200).json({
      error: false,
      message: 'User Login Succesfully!',
      token: token,
    })
  } catch (error) {
    return res.status(500).json({ error: true, message: error })
  }
}

export default { login }
