import { SuccessCodes } from './successCodes'

export class CustomSuccess {
  public readonly successCode: number
  public readonly successMessage: string
  public readonly data: any

  constructor(
    successType: (typeof SuccessCodes)[keyof typeof SuccessCodes],
    data: any = {},
  ) {
    this.successCode = successType.code
    this.successMessage = successType.message
    this.data = data
    Object.setPrototypeOf(this, CustomSuccess.prototype)
  }
}
