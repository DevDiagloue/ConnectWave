import { Document } from 'mongoose'

interface IUser extends Document {
  githubId: string
  userName: string
  firstName: string
  email: string
  password: string
  bio: string
  role: string
  createdAt: string
  updatedAt: string
}

export default IUser
