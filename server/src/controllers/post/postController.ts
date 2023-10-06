import { Request, Response } from 'express'
import BusinessRules from '../../utils/businessRules/BusinessRules'
import createPostValidationSchema from '../../validations/post/createPostValidationSchema'
import { createPostService } from '../../services/post/postServices'
import { CustomSuccess } from '../../handler/success/customSuccess'
import { SuccessCodes } from '../../handler/success/successCodes'
import { CustomError } from '../../handler/errors/customError'
import { ErrorCodes } from '../../handler/errors/errorCodes'

const createPost = async (req: Request, res: Response) => {
  try {
    const { user, content } = req.body

    const validationResult = createPostValidationSchema.safeParse(req.body)

    if (!validationResult.success) {
      throw new CustomError(ErrorCodes.INVALID_VALIDATION)
    }

    // const businessResult = await BusinessRules(() =>
    //   createPostService(user, content),
    // )

    // if (!businessResult) {
    //   return res.status(400).json({
    //     success: false,
    //     message: businessResult,
    //   })
    // }

    const postDto = {
      user,
      content,
    }

    const data = await createPostService(postDto)

    const successResponse = new CustomSuccess(SuccessCodes.OK, {
      message: SuccessCodes.OK.message,
      data: data,
    })

    return res.json(successResponse)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: true, message: 'Internal server error' })
  }
}

export default {
  createPost,
}
