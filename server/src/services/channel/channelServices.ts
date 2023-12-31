import { IResult } from '../../utils/businessRules/IResult'
import Channel from '../../models/Channel/Channel'
import Message from '../../models/Message/Message'
import { CustomError } from '../../handler/errors/customError'
import { ErrorCodes } from '../../handler/errors/errorCodes'

interface ChannelDto {
  channelName: string
  channelDescription: string
  channelType: string
}

interface ChannelMessageDto {
  channelId: string
  userId: string
  message: string
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

export const sendMessageChannelService = async (
  channelMessageDto: ChannelMessageDto,
) => {
  const newChannel = await Message.create(channelMessageDto)
  const data = await newChannel.save()
  return data
}

export const checkChannelExistsService = async (channelId: string) => {
  const checkChannelIsExists = await Channel.findById(channelId)

  if (!checkChannelIsExists) {
    throw new CustomError(ErrorCodes.CHANNEL_NOT_FOUND)
  }
  return { success: true }
}

export const leaveChannelService = async (
  channelId: string,
  userId: string,
): Promise<IResult> => {
  const channel = await Channel.findById(channelId)

  if (!channel) {
    throw new CustomError(ErrorCodes.CHANNEL_NOT_FOUND)
  }

  //check if user is owner of channel
  if (channel.channelOwner.toString() === userId) {
    throw new CustomError(ErrorCodes.CANNOT_LEAVE_CHANNEL_OWNER)
  }

  //check if user is last member of channel
  if (channel.channelMembers.length === 1) {
    throw new CustomError(ErrorCodes.CANNOT_LEAVE_AS_LAST_MEMBER)
  }

  await Channel.updateOne(
    { _id: channelId },
    { $pull: { channelMembers: userId } },
  )

  return { success: true }
}

export const deleteChannelService = async (
  channelId: string,
  userId: string,
): Promise<IResult> => {
  const channel = await Channel.findById(channelId)

  if (!channel) {
    throw new CustomError(ErrorCodes.CHANNEL_NOT_FOUND)
  }

  //check if user is owner of channel
  if (channel.channelOwner.toString() === userId) {
    throw new CustomError(ErrorCodes.CANNOT_LEAVE_CHANNEL_OWNER)
  }

  await channel.deleteOne({ _id: channelId })

  return { success: true }
}
