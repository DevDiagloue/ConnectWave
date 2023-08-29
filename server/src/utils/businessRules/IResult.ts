import IUser from '../../models/User/IUser'

export interface IResult<T = any> {
  success: boolean
  message?: string
  data?: T
}

export type GetUserByIdResponseDto = IResult<IUser>
export type GetAllUsersResponseDto = IResult<IUser[]>
export type GetUserByIdRequestDto = { id: string }
