import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  number: z
    .string()
    .min(11, "Phone number must be 11 digits")
    .max(11, "Phone number must be 11 digits"),
  fatherName: z.string().min(2, "Father name is required"),
  cnic: z
    .string()
    .regex(/^[0-9]{13}$/, "CNIC must be 13 digits without dashes"),

    password: z
    .string()
    .min(4, "password must be 4 digits")
    .max(4, "password must be 4 digits"),
});
