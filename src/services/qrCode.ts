import { toast } from "sonner";
import { api } from "./api";

export interface InfoUser {
  firstName: string;
  lastName: string;
  status: 'AVAILABLE' | 'OFFLINE';
  providersInQueue: number;
  positionOnQueue: number;
}

async function genQRCode(): Promise<string | undefined> {
  try {
    const response = await api.post<{ token: string }>("/gen/qr-code");

    return response.data.token;
  } catch (error) {
    toast.error("Falha ao gerar QR Code");
  }
}

async function getUserByQRCode(qrCode?: string) {
  try {

    if (!qrCode) {
      throw new Error("QR Code não informado");
    }

    const response = await api.get<InfoUser>(`/gen/qr-code/${qrCode}`);

    return response.data;
  } catch (error) {
    toast.error("Falha ao buscar usuário");
  }
}

export { genQRCode, getUserByQRCode };
