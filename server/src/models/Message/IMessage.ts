import mongoose, { Document } from 'mongoose'

interface IMessage extends Document {
  userId: mongoose.Types.ObjectId[]
  channelId: mongoose.Types.ObjectId
  message: string
  createdAt: string
  updatedAt: string
}

export default IMessage