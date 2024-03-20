import { CreateConferenceResponse } from "@/types/room";
import { useAuthStore } from "store/auth";
import { api } from "./api";

async function createConference(): Promise<CreateConferenceResponse> {
  try {
    const { user } = useAuthStore.getState();
    const response = await api.post<CreateConferenceResponse>(
      "/conference/create",
      {
        providerId: user?.id,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Falha ao criar conferência");
  }
}

async function closeConference(shortId: string): Promise<void> {
  const { user } = useAuthStore.getState();

  if (user === undefined || user?.userType === "REQUESTER") return;

  await api.post(`/conference/${shortId}/close`, {
    providerId: user?.id,
  });
}

export { closeConference, createConference };
