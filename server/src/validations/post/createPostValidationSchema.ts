import { z } from 'zod'

const createPostValidationSchema = z.object({
  user: z.string().min(1).max(280),
  content: z.string().min(1).max(280),
})

export default createPostValidationSchema
