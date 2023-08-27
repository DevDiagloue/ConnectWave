import { z } from "zod";

const userRegisterValidationSchema = z.object({
  userName: z.string().min(3).max(255),
  firstName: z.string().min(3).max(255),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .email()
    .min(3)
    .max(255),
  password: z.string().min(2).max(255),
});

export default userRegisterValidationSchema;
