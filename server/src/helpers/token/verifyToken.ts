import jwt from 'jsonwebtoken'

export const verifyUserToken = async (token: string, key: any): Promise<any> => {
  const keyValue = process.env.ACCESS_TOKEN_USER_KEY

  if (!keyValue) {
    throw new Error('Token key is missing or invalid.')
  }

  return jwt.verify(token, keyValue)
}
