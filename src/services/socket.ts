import { User } from "@/types/user";
import io from "socket.io-client";
import { toast } from "sonner";
import { useAuthStore } from "store/auth";
import { queryClient } from "./queryClient";
import { leaveQueue } from "./queue";
import { createConference } from "./room";

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

// socket.on("new_user_in_queue", async (userParam: User) => {
//   // const { user } = useAuthStore.getState();

//   console.log("user", userParam);

//   if (
//     userParam &&
//     userParam.userType === "PROVIDER" &&
//     userParam.status === "AVAILABLE"
//   ) {
//     // toast.info("Novo usuário na fila de espera", {
//     //   description: `Nome: ${userParam.firstName} ${userParam.lastName}`,
//     //   duration: 5000,
//     // });

//     console.log("Novo usuário na fila de espera");

//     const { conference } = await createConference();

//     if (!conference) toast.error("Não foi possível criar a conferencia.");
//   }
// });

// socket.on("provider_is_ready", ({ short, userId }) => {
//   const { user } = useAuthStore.getState();

//   if (user && (user.userType === "PROVIDER" || user.id !== userId)) return;

//   toast.success("Consultor disponível", {
//     description: "Você será direcionado para uma conferência.",
//     duration: 5000,
//     onAutoClose: () => {
//       window.location.href = `/conference/${short}`;
//     },
//   });
// });

socket.on("new_user_in_queue", async (user: User) => {
  const { user: currentUser } = useAuthStore.getState();

  if (currentUser && currentUser.userType === "PROVIDER") {
    toast.info("Entrou na fila de espera", {
      description: `Nome: ${user.firstName} ${user.lastName}`,
      duration: 5000,
    });

    await createConference();
  }
});

socket.on(
  "conference_created",
  async ({ short, userToCall, providerToCall }) => {
    const { user } = useAuthStore.getState();

    console.log("conference", user, short, userToCall);

    if (user && user.id === providerToCall.id) {
      window.location.href = `/conference/${short}`;
    }

    if (user && user.id === userToCall.id) {
      await leaveQueue();

      toast.success("Consultor disponível", {
        description: "Você será direcionado para uma conferência.",
        duration: 5000,
        closeButton: false,
        onAutoClose: async () => {
          window.location.href = `/conference/${short}`;
        },
      });
    }
  }
);

export default socket;
