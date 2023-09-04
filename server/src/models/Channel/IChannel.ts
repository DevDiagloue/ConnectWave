import mongoose, { Document } from 'mongoose'

interface IChannel extends Document {
  channelName: string
  channelDescription: string
  channelType: string
  channelMembers: mongoose.Types.ObjectId[]
  channelOwner: mongoose.Types.ObjectId
  createdAt: string
  updatedAt: string
}

export default IChannel
