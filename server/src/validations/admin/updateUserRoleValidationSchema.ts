import { z } from 'zod'

//zod 2 value required
const updateUserRoleValidationsSchema = z.object({
  role: z.string().min(3).max(50),
})

export default updateUserRoleValidationsSchema
