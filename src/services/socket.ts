import io from "socket.io-client";
import { queryClient } from "./queryClient";

const socket = io(import.meta.env.WS_URL ?? "http://localhost:3000");

socket.on("connect", () => {
  console.log("Conectado ao plantão");
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

socket.on("user_status_changed", (id) => {
  queryClient.invalidateQueries({
    queryKey: ["providers"],
  });
  console.log("user_status_changed", id);
});

export default socket;
