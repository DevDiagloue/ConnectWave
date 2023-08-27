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
};
