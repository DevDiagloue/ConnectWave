import IUser from '../../models/User/IUser'
import jwt from 'jsonwebtoken'

type Payload = {
  userId: string
}

export const generateToken = (user: IUser): Promise<string> => {
  const payload: Payload = {
    userId: user._id,
  }

  const key = process.env.ACCESS_TOKEN_USER_KEY || ''
  const tokenExpiration = process.env.TOKEN_EXPIRATION || '3d'

  if (!key) {
    return Promise.reject(new Error('Token key is missing or invalid.'))
  }

  try {
    const accessToken = jwt.sign(payload, key, { expiresIn: tokenExpiration })

    return Promise.resolve(accessToken)
  } catch (error) {
    return Promise.reject(new Error('Failed to generate token.'))
  }
}
