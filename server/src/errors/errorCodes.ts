import StatusCodes from "http-status-codes";

export const ErrorCodes = {
  EMAIL_EXISTS: {
    code: StatusCodes.BAD_REQUEST,
    message: "Email already exists",
  },
  USERNAME_EXISTS: {
    code: StatusCodes.BAD_REQUEST,
    message: "Username already exists",
  },
  PASSWORD_IS_WRONG: {
    code: StatusCodes.BAD_REQUEST,
    message: "Password or email is wrong",
  },
  EMAIL_NOT_FOUND: {
    code: StatusCodes.BAD_REQUEST,
    message: "Email not found",
  },
};
