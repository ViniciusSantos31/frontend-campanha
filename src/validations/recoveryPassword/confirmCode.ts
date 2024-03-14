import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const confirmCodeSchema = z.object({
  code: z
    .string({
      required_error: "O código é obrigatório",
    })
    .min(4, "O código deve possuír 4 dígitos"),
});

export type IConfirmCodeSchema = z.infer<typeof confirmCodeSchema>;

export const confirmCodeResolver = zodResolver(confirmCodeSchema);
