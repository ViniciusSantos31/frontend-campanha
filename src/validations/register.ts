import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signUpSchema = z
  .object({
    firstName: z.string().min(3, "Primeiro nome muito curto").max(255),
    lastName: z.string().min(3, "Último nome muito curto").max(255),
    email: z.string().email("Digite um e-mail válido"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .max(255),
    passwordConfirmation: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .max(255),
    phone: z
      .string()
      .min(10, "O número de telefone deve ter no mínimo 10 digitos")
      .max(15, "O número de telefone deve ter no máximo 15 digitos"),
    userType: z.enum(["REQUESTER", "PROVIDER"]).default("REQUESTER").optional(),
    status: z
      .enum(["AVAILABLE", "OFFLINE", "PAUSED", "BUSY"])
      .default("OFFLINE")
      .optional(),
    doc: z
      .string()
      .min(10, "O documento deve ter no mínimo 10 dígitos")
      .max(255, "O documento deve ter no máximo 255 dígitos")
      .optional(),
    cpf: z
      .string()
      .min(11, "O CPF deve conter 11 dígitos")
      .max(11, "O CPF deve conter 11 dígitos"),
    companyId: z
      .string()
      .optional()
      .default("c7e623a1-cea4-4d0b-bd7c-46b6aba861b2"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
  });

export type ISignUpSchema = z.infer<typeof signUpSchema>;

export const signUpResolver = zodResolver(signUpSchema);
