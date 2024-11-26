import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginAsGuestSchema = z.object({
  firstName: z.string().min(3, "Primeiro nome muito curto").max(255),
  lastName: z.string().min(3, "Último nome muito curto").max(255),
  qrCodeId: z.string().optional(),
});

export type ILoginAsGuestSchema = z.infer<typeof loginAsGuestSchema>;

export const loginAsGuestResolver = zodResolver(loginAsGuestSchema);
