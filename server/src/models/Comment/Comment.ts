import mongoose from 'mongoose'
import IComment from './IComment'
import moment from 'moment'

const commentSchema = new mongoose.Schema<IComment>({
  user: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: {
    type: String,
    required: true,
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
  },
})

const Comment = mongoose.model<IComment>('Comment', commentSchema)

export default Comment
