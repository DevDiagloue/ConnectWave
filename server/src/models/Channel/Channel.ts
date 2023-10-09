import mongoose from 'mongoose'
import IChannel from './IChannel'
import moment from 'moment'

const channelSchema = new mongoose.Schema<IChannel>({
  channelName: { type: String, required: true, unique: false },
  channelDescription: { type: String, required: false },
  channelType: { type: String, required: true },
  channelMembers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  channelOwner: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  createdAt: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm:ss a'),
  },
  updatedAt: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm:ss a'),
  },
})

const Channel = mongoose.model<IChannel>('Channel', channelSchema)

export default Channel
