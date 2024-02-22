import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signUpSchema = z.object({
  name: z
    .string({
      required_error: "O nome é obrigatório",
    })
    .min(3, "O nome deve ter no mínimo 3 caracteres"),
  personal_doc: z
    .string({
      required_error: "O CPF é obrigatório",
    })
    .min(11, "O CPF deve ter 11 caracteres")
    .refine((value) => isFinite(Number(value)), {
      message: "O CPF deve ser composto apenas por números",
    }),
  professional_doc: z
    .string({
      required_error: "O CRM é obrigatório",
    })
    .min(7, "O CRM deve ter 7 caracteres"),
  phone: z
    .string({
      required_error: "O celular é obrigatório",
    })
    .min(11, "O celular deve ter 11 caracteres"),
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
  password_confirmation: z
    .string({
      required_error: "A confirmação de senha é obrigatória",
    })
    .min(6, "A confirmação de senha deve ter no mínimo 6 caracteres"),
});

export type ISignUpSchema = z.infer<typeof signUpSchema>;

export const signUpResolver = zodResolver(signUpSchema);
