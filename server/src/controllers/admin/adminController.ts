import { Request, Response } from 'express'
import BusinessRules from '../../utils/businessRules/BusinessRules'
import { getUserId } from '../../services/admin/adminServices'
import getUserByIdValidationSchema from '../../validations/admin/getUserByIdValidationSchema'

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const validationResult = getUserByIdValidationSchema.safeParse(req.params)

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ObjectId',
      })
    }

    const businessResult = await BusinessRules(() => getUserId(id))

    if (!businessResult) {
      return res.status(400).json({
        success: false,
        message: businessResult,
      })
    }

    return res.status(200).json({
      success: false,
      message: 'User found!',
      data: businessResult.data,
    })
  } catch (error) {
    return res.status(500).json({ error: true, message: error })
  }
}

export default { getUserById }
