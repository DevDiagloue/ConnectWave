import IUser from '../../models/User/IUser'
import jwt from 'jsonwebtoken'
import Token from '../../models/Token/Token'

type Payload = {
  userId: string
}

export const generateAccessToken = (user: IUser): string => {
  const payload: Payload = {
    userId: user._id.toString(),
  }

  return jwt.sign(payload, process.env.ACCESS_TOKEN_USER_KEY!, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  })
}

export const generateRefreshToken = async (user: IUser): Promise<string> => {
  const payload: Payload = {
    userId: user._id.toString(),
  }

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_USER_KEY!, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
  })

  const expires = new Date(Date.now() + process.env.REFRESH_TOKEN_EXPIRATION!)

  const tokenDocument = new Token({
    token: refreshToken,
    userId: user._id,
    expires,
  })

  await tokenDocument.save()

  return refreshToken
}

// export const generateToken = (user: IUser): Promise<string> => {
//   const payload: Payload = {
//     userId: user._id,
//   }

//   const key = process.env.ACCESS_TOKEN_USER_KEY || ''
//   const tokenExpiration = process.env.TOKEN_EXPIRATION || '3d'

//   if (!key) {
//     return Promise.reject(new Error('Token key is missing or invalid.'))
//   }

//   try {
//     const accessToken = jwt.sign(payload, key, { expiresIn: tokenExpiration })

//     return Promise.resolve(accessToken)
//   } catch (error) {
//     return Promise.reject(new Error('Failed to generate token.'))
//   }
// }
