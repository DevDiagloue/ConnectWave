import { z } from 'zod'

const userLoginValidationSchema = z.object({
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    })
    .min(3)
    .max(50)
    .email(),
  password: z.string().min(3).max(100),
})

export default userLoginValidationSchema
