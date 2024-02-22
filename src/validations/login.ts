import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "O e-mail é obrigatório",
      invalid_type_error: "Insira um e-mail válido",
    })
    .email("Insira um e-mail válido"),
  password: z
    .string({
      required_error: "A senha é obrigatória",
    })
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type ILoginSchema = z.infer<typeof loginSchema>;

export const loginResolver = zodResolver(loginSchema);
