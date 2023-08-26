import { z } from "zod";

const userRegisterValidationSchema = z.object({
  userName: z.string().min(3).max(255),
  firstName: z.string({}).min(3).max(255),
  email: z.string({}).email().min(3).max(255),
  password: z.string({}).min(6).max(255),
  profilePicture: z.string({}).min(3).max(255).optional(),
});

export default userRegisterValidationSchema;
