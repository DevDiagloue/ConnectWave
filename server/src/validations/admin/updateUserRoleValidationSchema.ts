import { z } from 'zod'

const updateUserRoleValidationsSchema = z.object({
  role: z.string().min(3).max(50),
})

export default updateUserRoleValidationsSchema
