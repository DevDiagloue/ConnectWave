import { IResult } from '../../utils/businessRules/IResult'
import Channel from '../../models/Channel/Channel'
import { CustomError } from '../../handler/errors/customError'
import { ErrorCodes } from '../../handler/errors/errorCodes'

interface ChannelDto {
  channelName: string
  channelDescription: string
  channelType: string
}

export const createChannelService = async (channelDto: ChannelDto) => {
  const newChannel = await Channel.create(channelDto)
  const data = await newChannel.save()
  return data
}

export const checkChannelNameExists = async (
  channelName: string,
): Promise<IResult> => {
  const userNameExists = await Channel.findOne({ channelName })

  if (userNameExists) {
    throw new CustomError(ErrorCodes.USERNAME_EXISTS)
  }

  return { success: true }
}

export const joinChannelService = async (
  channelId: string,
  userId: string,
): Promise<IResult> => {

  const channel = await Channel.findByIdAndUpdate(
    channelId,
    { $addToSet: { channelMembers: userId } },
    { new: true },
  )

  if (!channel) {
    throw new CustomError(ErrorCodes.CHANNEL_NOT_FOUND)
  }

  return { success: true }
}
