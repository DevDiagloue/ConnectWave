import { Request, Response } from 'express'
import BusinessRules from '../../utils/businessRules/BusinessRules'
import {
  getUserByIdService,
  getAllUserService,
  updateUserByIdService,
  updateUserRoleService,
  deleteUserByIdService,
} from '../../services/admin/adminServices'
import getUserByIdValidationSchema from '../../validations/admin/getUserByIdValidationSchema'
import updateUserByIdValidationsSchema from '../../validations/admin/updateUserByIdValidationsSchema'
import updateUserRoleValidationsSchema from '../../validations/admin/updateUserRoleValidationSchema'
import deleteUserByIdValidationSchema from '../../validations/admin/deleteUserByIdValidationSchema'
import { CustomSuccess } from '../../handler/success/customSuccess'
import { SuccessCodes } from '../../handler/success/successCodes'
import { CustomError } from '../../handler/errors/customError'
import { ErrorCodes } from '../../handler/errors/errorCodes'

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const validationResult = getUserByIdValidationSchema.safeParse(req.params)

    if (!validationResult.success) {
      throw new CustomError(ErrorCodes.INVALID_VALIDATION)
    }

    const businessResult = await BusinessRules(() => getUserByIdService(id))

    if (!businessResult) {
      return res.status(400).json({
        success: false,
        message: businessResult,
      })
    }

    const successResponse = new CustomSuccess(SuccessCodes.OK, {
      message: SuccessCodes.OK.message,
      data: businessResult.data,
    })
    return res.json(successResponse)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: true, message: 'Internal server error' })
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

    const successResponse = new CustomSuccess(SuccessCodes.OK, {
      message: SuccessCodes.OK.message,
      data: businessResult.data,
    })

    return res.json(successResponse)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: true, message: 'Internal server error' })
  }
}

const updateUserById = async (req: Request, res: Response) => {
  try {
    const validationResult = updateUserByIdValidationsSchema.safeParse(req.body)

    if (!validationResult.success) {
      throw new CustomError(ErrorCodes.INVALID_VALIDATION)
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

    const successResponse = new CustomSuccess(SuccessCodes.OK, {
      message: SuccessCodes.OK.message,
      data: businessResult.data,
    })

    return res.json(successResponse)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: true, message: 'Internal server error' })
  }
}

const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { role } = req.body

    const validationResult = updateUserRoleValidationsSchema.safeParse(req.body)

    if (!validationResult.success) {
      throw new CustomError(ErrorCodes.INVALID_VALIDATION)
    }

    const businessResult = await BusinessRules(() =>
      updateUserRoleService(id, role),
    )

    if (!businessResult) {
      return res.status(400).json({
        success: false,
        message: businessResult,
      })
    }

    const successResponse = new CustomSuccess(SuccessCodes.OK, {
      message: SuccessCodes.OK.message,
      data: businessResult.data,
    })

    return res.json(successResponse)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: true, message: 'Internal server error' })
  }
}

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const validationResult = deleteUserByIdValidationSchema.safeParse(
      req.params,
    )

    if (!validationResult.success) {
      throw new CustomError(ErrorCodes.INVALID_VALIDATION)
    }

    const businessResult = await BusinessRules(() => deleteUserByIdService(id))

    if (!businessResult) {
      return res.status(400).json({
        success: false,
        message: businessResult,
      })
    }

    const successResponse = new CustomSuccess(SuccessCodes.OK, {
      message: SuccessCodes.OK.message,
      data: businessResult.data,
    })

    return res.json(successResponse)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: true, message: error })
  }
}

export default {
  getUserById,
  getAllUsers,
  updateUserById,
  updateUserRole,
  deleteUserById,
}
