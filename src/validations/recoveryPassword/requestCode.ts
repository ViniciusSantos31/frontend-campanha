import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const requestCodeSchema = z.object({
  email: z
    .string({
      required_error: "O e-mail é obrigatório",
      invalid_type_error: "Insira um e-mail válido",
    })
    .email("Insira um e-mail válido"),
});

export type IRequestCodeSchema = z.infer<typeof requestCodeSchema>;

export const requestCodeResolver = zodResolver(requestCodeSchema);
