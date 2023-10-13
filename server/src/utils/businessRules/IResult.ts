import IUser from '../../models/User/IUser'

export interface IResult<T = any> {
  success: boolean
  message?: string
  data?: T
}
