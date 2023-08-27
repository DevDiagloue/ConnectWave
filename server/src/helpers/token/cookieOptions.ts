interface ICookieOptions {
  httpOnly: boolean
  secure: boolean
  sameSite: 'lax' | 'strict' | 'none'
  maxAge: number
}

export const cookieOptions: ICookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'development' ? false : true,
  sameSite: 'lax', //cross-site cookie
  maxAge: 60 * 60 * 24 * 1000,
}
