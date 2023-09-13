import mongoose from 'mongoose'
import IBlackListToken from './IBlackListToken'
import moment from 'moment'

const blackListTokenSchema = new mongoose.Schema<IBlackListToken>({
  blackListToken: { type: String, required: true },
  expireDate: {
    type: String,
    required: true,
  },
})

const BlackListToken = mongoose.model<IBlackListToken>(
  'BlackListToken',
  blackListTokenSchema,
)

export default BlackListToken
