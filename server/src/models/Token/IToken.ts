import mongoose, { Document } from 'mongoose'

interface IToken extends Document {
  userId: mongoose.Schema.Types.ObjectId
  token: string
  expires: string
}

export default IToken
