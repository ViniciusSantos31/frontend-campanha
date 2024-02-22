import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const editProfileSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  email: z
    .string({
      required_error: "O e-mail é obrigatório",
      invalid_type_error: "Insira um e-mail válido",
    })
    .email("Insira um e-mail válido"),
  avatar: z.string().url("Insira uma URL válida"),
});

export type IEditProfileSchema = z.infer<typeof editProfileSchema>;

export const editProfileResolver = zodResolver(editProfileSchema);
