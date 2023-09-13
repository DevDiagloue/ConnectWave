import jwt from 'jsonwebtoken'

export const verifyUserToken = (token: string, key: string): any => {
  if (!key) {
    throw new Error('Token key is missing or invalid.')
  }

  return jwt.verify(token, key)
}
