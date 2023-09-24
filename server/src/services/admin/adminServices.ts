import User from '../../models/User/User'
import { IResult } from '../../utils/businessRules/IResult'
import { CustomError } from '../../handler/errors/customError'
import { ErrorCodes } from '../../handler/errors/errorCodes'
import Channel from '../../models/Channel/Channel'

export const getUserByIdService = async (id: string): Promise<IResult> => {
  const user = await User.findById(id)
  if (!user) {
    throw new CustomError(ErrorCodes.USER_NOT_FOUND)
  }
  return { success: true, data: user }
}

export const getAllUserService = async (
  page: number,
  pageSize: number,
): Promise<IResult> => {
  const allUsers = await User.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort('-createdAt')

  if (!allUsers) {
    throw new CustomError(ErrorCodes.USER_NOT_FOUND)
  }
  return { success: true, data: allUsers }
}

export const updateUserByIdService = async (
  id: string,
  updatedUserData: any,
): Promise<IResult> => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    updatedUserData,
    { new: true },
  )

  if (!updatedUser) {
    throw new CustomError(ErrorCodes.USER_NOT_FOUND)
  }
  return { success: true, data: updatedUserData }
}

export const updateUserRoleService = async (
  id: string,
  role: string,
): Promise<IResult> => {
  const user = await User.findById(id)

  if (!user) {
    throw new CustomError(ErrorCodes.USER_NOT_FOUND)
  }

  const updatedUserRoles = await User.updateOne(
    { _id: user._id },
    { $set: { role: role } },
  )

  const updatedRole = await user.save()

  return { success: true, data: updatedRole }
}

export const deleteUserByIdService = async (id: string): Promise<IResult> => {
  const user = await User.findById(id)

  console.log(user, 'user Information')

  //check this if scope is not working
  // if (user === null) {
  //   throw new CustomError(ErrorCodes.USER_NOT_FOUND)
  // }

  const deletedUser = await User.deleteOne({ _id: id })

  return { success: true, data: null }
}

export const getChannelInformationByIdService = async (
  id: string,
): Promise<IResult> => {
  const channelInformation = await Channel.findById(id)

  if (!channelInformation) {
    throw new CustomError(ErrorCodes.USER_NOT_FOUND)
  }

  return { success: true, data: channelInformation }
}

export const getAllChannel = async (
  page: number,
  pageSize: number,
): Promise<IResult> => {
  const allChannels = await Channel.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort('-createdAt')

  if (!allChannels) {
    throw new CustomError(ErrorCodes.CHANNEL_NOT_FOUND)
  }
  return { success: true, data: allChannels }
}
