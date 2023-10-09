import StatusCodes from 'http-status-codes'

export const ErrorCodes = {
  EMAIL_EXISTS: {
    code: StatusCodes.BAD_REQUEST,
    message: 'Email already exists',
  },
  USERNAME_EXISTS: {
    code: StatusCodes.BAD_REQUEST,
    message: 'Username already exists',
  },
  CHANNEL_NOT_FOUND: {
    code: StatusCodes.BAD_REQUEST,
    message: 'Channel not found',
  },
  PASSWORD_IS_WRONG: {
    code: StatusCodes.BAD_REQUEST,
    message: 'Password or email is wrong',
  },
  EMAIL_NOT_FOUND: {
    code: StatusCodes.BAD_REQUEST,
    message: 'Email not found',
  },
  USER_NOT_FOUND: {
    code: StatusCodes.BAD_REQUEST,
    message: 'User not found',
  },
  INVALID_VALIDATION: {
    code: StatusCodes.BAD_REQUEST,
    message: 'Invalid Validation Please check your inputs',
  },
  BLACKLIST_TOKEN: {
    code: StatusCodes.BAD_REQUEST,
    message: 'Token is blacklisted. Please re-login',
  },
  INVALID_TOKEN: {
    code: StatusCodes.BAD_REQUEST,
    message: 'Invalid Token',
  },
  INVALID_USER: {
    code: StatusCodes.BAD_REQUEST,
    message: 'Invalid User',
  },
  CANNOT_LEAVE_CHANNEL_OWNER: {
    code: StatusCodes.BAD_REQUEST,
    message: 'Cannot leave channel owner',
  },
  CANNOT_LEAVE_AS_LAST_MEMBER: {
    code: StatusCodes.BAD_REQUEST,
    message: 'Cannot leave as last member',
  },
}
