import { z } from "zod";

export const SigninValidation = z.object({
  email: z.string().email({ message: "Некорректный email" }),
  password: z
    .string()
    .min(5, { message: "Пароль должен быть больше 5 символов" }),
});
