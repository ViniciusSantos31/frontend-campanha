import { useAuthStore } from "store/auth";
import { api } from "./api";
import { createConference } from "./room";

async function joinQueue(): Promise<void> {
  try {
    const { user } = useAuthStore.getState();
    await api.post("/users/queue/join");

    if (user && user.userType === "PROVIDER" && user.status === "AVAILABLE") {
      await createConference();
    }
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível entrar na fila.");
  }
}

async function leaveQueue(): Promise<void> {
  await api.post(`/users/queue/leave`);
}

export { joinQueue, leaveQueue };
