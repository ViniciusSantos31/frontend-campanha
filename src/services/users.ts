import { IEditProfileSchema } from "@validations/editProfile";
import { toast } from "sonner";
import { useAuthStore } from "store/auth";
import { api } from "./api";

async function me(): Promise<void> {
  try {
    const response = await api.get("/users/me");

    const { saveUser } = useAuthStore.getState();

    saveUser(response.data);
  } catch (error) {
    console.error(error);
    toast.error("Não foi possível atualizar suas informações.");
  }
}
async function update(data: IEditProfileSchema): Promise<void> {
  try {
    const { user } = useAuthStore.getState();
    await api.post(`/users/${user?.id}`, data);
    toast.success("Perfil atualizado com sucesso");
  } catch {
    toast.error("Não foi possível atualizar suas informações.");
  }
}

export { me, update };
