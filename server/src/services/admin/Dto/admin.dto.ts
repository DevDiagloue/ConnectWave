import IUser from '../../../models/User/IUser'

export interface GetUserByIdResponseDto {
  success: boolean
  data: IUser
}

export interface GetUserByIdRequestDto {
  id: string
}

export interface GetAllUsersResponseDto {
  success: boolean
  data: IUser[]
}

