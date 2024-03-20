import { Provider, ProviderListResponse } from "@/types/provider";
import { useAuthStore } from "store/auth";
import { api } from "./api";

async function list(): Promise<Provider[] | null> {
  const response = await api.get<ProviderListResponse>("/users/providers");
  return response.data.users;
}

async function toggleStatus(): Promise<void> {
  await api.put<void>("/users/provider/status");
}

async function makeProviderBusy(): Promise<void> {
  const { user } = useAuthStore.getState();

  await api.put<void>(`/users/${user?.id}`, {
    status: "BUSY",
  });
}

export { list, makeProviderBusy, toggleStatus };
