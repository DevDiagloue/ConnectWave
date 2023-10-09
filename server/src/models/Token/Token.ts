import mongoose from 'mongoose'
import IToken from './IToken'
import moment from 'moment'

const tokenSchema = new mongoose.Schema<IToken>({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  expires: {
    type: String,
    required: true,
  },
})

const Token = mongoose.model<IToken>('Token', tokenSchema)

export default Token
