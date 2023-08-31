import { z } from 'zod'

const updateUserByIdValidationsSchema = z.object({
  userName: z.string().min(3).max(50).optional(),
  firstName: z.string().min(3).max(50).optional(),
  email: z.string().email().min(3).max(50).optional(),
  password: z.string().min(2).max(100).optional(),
})

export default updateUserByIdValidationsSchema
