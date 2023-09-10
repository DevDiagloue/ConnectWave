import IUser from '../../models/User/IUser'
import jwt from 'jsonwebtoken'
import Token from '../../models/Token/Token'
import moment from 'moment'

type Payload = {
  userId: string
}

export const generateAccessToken = (user: IUser): string => {
  try {
    const payload: Payload = {
      userId: user._id.toString(),
    }

    return jwt.sign(payload, process.env.ACCESS_TOKEN_USER_KEY!, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    })
  } catch (error) {
    console.error('Access token error:', error)
    throw new Error('Access token not created.')
  }
}

export const generateRefreshToken = async (user: IUser): Promise<string> => {
  try {
    const payload: Payload = {
      userId: user._id.toString(),
    }

    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_USER_KEY!,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
      },
    )

    const expires = moment()
      .add(process.env.REFRESH_TOKEN_EXPIRATION, 'seconds')
      .toDate()

    const tokenDocument = new Token({
      token: refreshToken,
      userId: user._id,
      expires,
    })

    await tokenDocument.save()

    return refreshToken
  } catch (error) {
    console.error('Refresh token error:', error)
    throw new Error('Refresh not created.')
  }
}
