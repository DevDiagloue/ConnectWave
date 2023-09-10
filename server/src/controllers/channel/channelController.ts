import { Request, Response } from 'express'
import BusinessRules from '../../utils/businessRules/BusinessRules'
import createChannelValidationSchema from '../../validations/channel/createChannelValidationSchema'
import { CustomSuccess } from '../../handler/success/customSuccess'
import { SuccessCodes } from '../../handler/success/successCodes'
import { CustomError } from '../../handler/errors/customError'
import { ErrorCodes } from '../../handler/errors/errorCodes'
import {
  createChannelService,
  checkChannelNameExists,
} from '../../services/channel/channelServices'
import { CustomRequest } from '../../helpers/request/CustomRequest'

const channelCreate = async (req: Request, res: Response) => {
  try {
    const { channelName, channelDescription, channelType } = req.body

    const validationResult = createChannelValidationSchema.safeParse(req.body)

    if (!validationResult.success) {
      throw new CustomError(ErrorCodes.INVALID_VALIDATION)
    }
    const businessResult = await BusinessRules(() =>
      checkChannelNameExists(channelName),
    )

    if (!businessResult) {
      return res.status(400).json({
        success: false,
        message: businessResult,
      })
    }

    const token = (req as CustomRequest).token
    const userId = (token as { userId: string }).userId

    const channelDto = {
      channelName,
      channelDescription,
      channelType,
      channelOwner: userId,
    }
    const data = await createChannelService(channelDto)

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
  channelCreate,
}
