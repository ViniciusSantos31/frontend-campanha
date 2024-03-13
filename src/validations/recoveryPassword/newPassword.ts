import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const newPasswordSchema = z
  .object({
    new_password: z
      .string({
        required_error: "A senha é obrigatória",
      })
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
    password_confirmation: z
      .string({
        required_error: "A confirmação de senha é obrigatória",
      })
      .min(6, "A confirmação de senha deve ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.new_password === data.password_confirmation, {
    message: "As senhas não coincidem",
    path: ["password_confirmation"],
  });

export type INewPasswordSchema = z.infer<typeof newPasswordSchema>;

export const newPasswordResolver = zodResolver(newPasswordSchema);
