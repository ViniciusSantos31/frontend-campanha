import io from "socket.io-client";
import { queryClient } from "./queryClient";

const ivDevMode = import.meta.env.DEV;
const wsURL = ivDevMode ? "http://localhost:3000" : import.meta.env.VITE_WS_URL;

const socket = io(wsURL);

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
