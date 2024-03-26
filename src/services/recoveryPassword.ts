import { IEditProfileSchema } from "@validations/editProfile";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useAuthStore } from "store/auth";
import { api } from "./api";

async function requestCode(email: string): Promise<string> {
  try {
    const response = await api.post<{ id: string }>("/recovery/request", {
      email,
    });

    return response.data.id;
  } catch (error) {
    console.log("error", error);
    if (error instanceof AxiosError)
      toast.error("Não foi possível enviar o código de recuperação.", {
        description: error.response?.data.message,
      });
    throw error;
  }
}

async function confirmCode(data: { id: string; code: number }): Promise<void> {
  try {
    await api.post(`/recovery/confirm`, { code: data.code });
  } catch {
    toast.error("Código inválido. Tente novamente.");
  }
}

async function resendCode(data: IEditProfileSchema): Promise<void> {
  try {
    const { user } = useAuthStore.getState();
    await api.post(`/users/${user?.id}`, data);
    toast.success("Perfil atualizado com sucesso");
  } catch {
    toast.error("Não foi possível atualizar suas informações.");
  }
}

async function resetPassword(data: {
  password: string;
  codeId: string;
}): Promise<void> {
  try {
    await api.post(`/recovery/reset/${data.codeId}`, {
      password: data.password,
    });
    toast.success("Perfil atualizado com sucesso");
  } catch {
    toast.error("Não foi possível atualizar suas informações.");
  }
}

async function verifyCodeId(id: string): Promise<boolean> {
  try {
    await api.get(`/recovery/verify/${id}`);
    return true;
  } catch {
    return false;
  }
}

export { confirmCode, requestCode, resendCode, resetPassword, verifyCodeId };
