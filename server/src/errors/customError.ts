import { ErrorCodes } from "./errorCodes";

export class CustomError extends Error {
  public readonly errorCode: number;
  public readonly errorMessage: string;

  constructor(errorType: (typeof ErrorCodes)[keyof typeof ErrorCodes]) {
    super(errorType.message);
    this.errorCode = errorType.code;
    this.errorMessage = errorType.message;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
