import jwt from 'jsonwebtoken'

export const verifyUserToken = async (token: string): Promise<any> => {
  const key = process.env.ACCESS_TOKEN_USER_KEY

  if (!key) {
    throw new Error('Token key is missing or invalid.')
  }

  return jwt.verify(token, key)
}
