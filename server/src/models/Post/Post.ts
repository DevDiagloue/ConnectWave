import mongoose from 'mongoose'
import IPost from '../Post/IPost'
import CommentSchema from '../Comment/Comment'
import moment from 'moment'

const commentSchema = new mongoose.Schema<IPost>({
  user: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: String, require: false },
  likeCount: { type: String, default: '0' },
  retweetCount: { type: Number, default: 0 },
  hashtags: [{ type: String }],
  comments: [CommentSchema],
  filePath: { type: String },
  location: { type: String },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
})

const Post = mongoose.model('Post', commentSchema)

export default Post