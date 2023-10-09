import { IResult } from '../../utils/businessRules/IResult'
import Post from '../../models/Post/Post'
import { CustomError } from '../../handler/errors/customError'
import { ErrorCodes } from '../../handler/errors/errorCodes'

interface PostDto {
  user: string
  content: string
}

export const createPostService = async (postDto: PostDto) => {
  const newPost = await Post.create(postDto)
  const data = await newPost.save()
  return data
}
