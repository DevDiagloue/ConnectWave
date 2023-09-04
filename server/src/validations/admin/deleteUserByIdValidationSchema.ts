import { z } from 'zod'

const deleteUserByIdValidationSchema = z.object({
  id: z.string().refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
    message: 'Invalid ObjectId',
  }),
})

export default deleteUserByIdValidationSchema
