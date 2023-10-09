import mongoose, { Document, Schema } from 'mongoose'

interface IComment extends Document {
  user: string
  content: string
  createdAt: string
}

export default IComment
