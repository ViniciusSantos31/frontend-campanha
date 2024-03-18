import { Provider, ProviderListResponse } from "@/types/provider";
import { api } from "./api";

async function list(): Promise<Provider[] | null> {
  const response = await api.get<ProviderListResponse>("/users/providers");
  return response.data.users;
}

async function toggleStatus(): Promise<void> {
  await api.patch<ProviderListResponse>("/users/provider/status");
}

export { list, toggleStatus };
