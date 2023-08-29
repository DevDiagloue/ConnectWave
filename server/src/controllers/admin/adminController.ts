import { Request, Response } from 'express'
import BusinessRules from '../../utils/businessRules/BusinessRules'
import {
  getUserByIdService,
  getAllUserService,
  updateUserByIdService,
} from '../../services/admin/adminServices'
import getUserByIdValidationSchema from '../../validations/admin/getUserByIdValidationSchema'
import updateUserByIdValidationsSchema from '../../validations/admin/updateUserByIdValidationsSchema'

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

    const businessResult = await BusinessRules(() => getUserByIdService(id))

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

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.pageNumber) || 1
    const pageSize = 20

    const businessResult = await BusinessRules(() =>
      getAllUserService(page, pageSize),
    )

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

const updateUserById = async (req: Request, res: Response) => {
  try {
    const validationResult = updateUserByIdValidationsSchema.safeParse(req.body)

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Data Fields',
      })
    }

    const { id } = req.params
    const updatedUserData = req.body

    const businessResult = await BusinessRules(() =>
      updateUserByIdService(id, updatedUserData),
    )

    if (!businessResult) {
      return res.status(400).json({
        success: false,
        message: businessResult,
      })
    }

    return res.status(200).json({
      success: false,
      message: 'User updated by using id!',
      data: businessResult.data,
    })
  } catch (error) {
    return res.status(500).json({ error: true, message: error })
  }
}

const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { roles } = req.body
  } catch (error) {
    return res.status(500).json({ error: true, message: error })
  }
}

export default { getUserById, getAllUsers, updateUserById, updateUserRole }
