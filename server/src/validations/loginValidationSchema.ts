import { z } from "zod";

const userLoginValidationSchema = z.object({
  email: z.string().min(3).max(255).email(),
  password: z.string().min(6).max(255),
});

export default userLoginValidationSchema;