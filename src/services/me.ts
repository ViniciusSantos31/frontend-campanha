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

export { me };
