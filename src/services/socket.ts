import io from "socket.io-client";
import { toast } from "sonner";
import { useAuthStore } from "store/auth";
import { queryClient } from "./queryClient";
import { leaveQueue } from "./queue";
import { createConference } from "./room";
import { me } from "./users";

const ivDevMode = import.meta.env.DEV;
const wsURL = ivDevMode ? "http://localhost:3333" : import.meta.env.VITE_WS_URL;

const socket = io(wsURL, {
  transports: ["websocket"],
  autoConnect: false,
});

socket.on("connect", () => {
  console.log("Conectado ao plantão");
});

socket.on("new_connection", () => {
  toast.info("Nova conexão", {
    description: "Um novo usuário entrou no plantão.",
    duration: 5000,
  });
});

socket.on("user_login", () => {
  queryClient.invalidateQueries({
    queryKey: ["providers"],
  });
});

socket.on("disconnect", () => {
  console.log("Desconectado do plantão");
});

socket.on("user_logout", () => {
  queryClient.invalidateQueries({
    queryKey: ["providers"],
  });
});

socket.on("user_status_changed", () => {
  queryClient.invalidateQueries({
    queryKey: ["providers"],
  });
});

socket.on("new_user_in_queue", async () => {
  await me();

  const { user: currentUser } = useAuthStore.getState();

  if (
    currentUser &&
    currentUser.userType === "PROVIDER" &&
    currentUser.status === "AVAILABLE"
  ) {
    await createConference();
  }
});

socket.on(
  "conference_created",
  async ({ short, userToCall, providerToCall }) => {
    const { user } = useAuthStore.getState();

    console.log("user", user?.id, "providerToCall", providerToCall.id);

    console.log("conference_created", short, userToCall, providerToCall);

    if (user && user.id === providerToCall.id) {
      window.location.href = `/conference/${short}`;
    }

    if (user && user.id === userToCall.id) {
      await leaveQueue();

      toast.success("Consultor disponível", {
        description: "Você será direcionado para uma conferência.",
        duration: 5000,
        closeButton: false,
        action: {
          label: "Entrar agora.",
          onClick: () => {
            window.location.href = `/conference/${short}`;
          },
        },
        onAutoClose: async () => {
          window.location.href = `/conference/${short}`;
        },
      });
    }
  }
);

export default socket;
