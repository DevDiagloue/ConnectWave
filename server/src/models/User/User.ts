import mongoose from 'mongoose'
import IUser from './IUser'
import moment from 'moment'

const userSchema = new mongoose.Schema<IUser>({
  userName: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm:ss a'),
  },
  updatedAt: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm:ss a'),
  },
})

const User = mongoose.model<IUser>('User', userSchema)

export default User
