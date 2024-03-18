import { CreateRoomResponse } from "@/types/room";
import { useAuthStore } from "store/auth";
import { api } from "./api";

async function createRoom(): Promise<CreateRoomResponse> {
  const response = await api.post<CreateRoomResponse>("/api/room");
  const user = useAuthStore.getState().user;
  if (user) useAuthStore.getState().saveUser({ ...user, status: "AVAILABLE" });
  return response.data;
}

async function releaseRoom(): Promise<void> {
  const userId = useAuthStore.getState().user?.id;

  await api.post(`/api/releaseRoom/${userId}`);
}

export { createRoom, releaseRoom };
