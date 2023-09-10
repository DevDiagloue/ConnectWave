import mongoose from 'mongoose'
import IMessage from './IMessage'
import moment from 'moment'

const messageSchema = new mongoose.Schema<IMessage>({
  userId: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
  channelId: [
    { type: mongoose.Types.ObjectId, required: true, ref: 'Channel' },
  ],
  message: { type: String, required: true },
  createdAt: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm:ss a'),
  },
  updatedAt: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm:ss a'),
  },
})

const Message = mongoose.model<IMessage>('Message', messageSchema)

export default Message
