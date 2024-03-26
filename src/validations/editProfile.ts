import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const editProfileSchema = z.object({
  firstName: z.string().min(2, "Primeiro nome muito curto"),
  lastName: z.string().min(2, "Último nome muito curto"),
  email: z
    .string({
      required_error: "O e-mail é obrigatório",
      invalid_type_error: "Insira um e-mail válido",
    })
    .email("Insira um e-mail válido"),
  avatarUrl: z.string().url("Insira uma URL válida").optional(),
});

export type IEditProfileSchema = z.infer<typeof editProfileSchema>;

export const editProfileResolver = zodResolver(editProfileSchema);
