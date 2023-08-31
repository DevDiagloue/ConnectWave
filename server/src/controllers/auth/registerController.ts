import { Request, Response } from 'express'
import userRegisterValidationSchema from '../../validations/auth/registerValidationSchema'
import bcrypt from 'bcrypt'
import BusinessRules from '../../utils/businessRules/BusinessRules'
import {
  emailExistsCheck,
  createNewUser,
  userNameExistsCheck,
} from '../../services/auth/registerServices'
import { CustomSuccess } from '../../handler/success/customSuccess'
import { SuccessCodes } from '../../handler/success/successCodes'
import { CustomError } from '../../handler/errors/customError'
import { ErrorCodes } from '../../handler/errors/errorCodes'

const register = async (req: Request, res: Response) => {
  const { userName, firstName, email, password } = req.body

  try {
    const validationResult = await userRegisterValidationSchema.safeParse(
      req.body,
    )

    if (!validationResult.success) {
      throw new CustomError(ErrorCodes.INVALID_VALIDATION)
    }

    const businessResult = await BusinessRules(
      () => userNameExistsCheck(userName),
      () => emailExistsCheck(email),
    )

    if (!businessResult) {
      return res.status(400).json({
        success: false,
        message: businessResult,
      })
    }

    const saltPassword = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, saltPassword)

    const userDto = { userName, firstName, email, password: hashPassword }
    const data = await createNewUser(userDto)

    const successResponse = new CustomSuccess(SuccessCodes.OK, {
      message: SuccessCodes.OK.message,
      data: data,
    })

    return res.json(successResponse)
  } catch (error) {
    return res.status(500).json({ error: true, message: error })
  }
}

export default { register }
