import mongoose, { Document } from 'mongoose'

interface IBlackListToken extends Document {
  blackListToken: string
  expireDate: string
}

export default IBlackListToken
