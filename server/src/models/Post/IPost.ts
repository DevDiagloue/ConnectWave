import mongoose, { Document } from 'mongoose'
import IComment from '../Comment/IComment'

interface IPost extends Document {
  user: string
  content: string
  createdAt: string
  likeCount: string
  retweetCount: number
  hashtags: string[]
  comments: IComment[]
  filePath?: string
  location?: string
  status: 'pending' | 'approved' | 'rejected'
}

export default IPost
