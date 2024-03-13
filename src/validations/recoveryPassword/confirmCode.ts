import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const confirmCodeSchema = z.object({
  code: z
    .string({
      required_error: "O código é obrigatório",
    })
    .min(6, "O código deve possuír 6 dígitos"),
});

export type IConfirmCodeSchema = z.infer<typeof confirmCodeSchema>;

export const confirmCodeResolver = zodResolver(confirmCodeSchema);
