import { api } from "./api";

async function joinQueue(): Promise<void> {
  try {
    await api.post("/users/queue/join");
  } catch (error) {
    console.error(error);
    throw new Error("Não foi possível entrar na fila.");
  }
}

async function leaveQueue(): Promise<void> {
  await api.post(`/users/queue/leave`);
}

export { joinQueue, leaveQueue };
