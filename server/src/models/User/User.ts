import mongoose from 'mongoose'
import IUser from './IUser'
import moment from 'moment'

const userSchema = new mongoose.Schema<IUser>({
  userName: { type: String, required: false, unique: true },
  firstName: { type: String, required: false },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: false },
  bio: { type: String, required: false },
  role: {
    type: String,
    required: false,
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
