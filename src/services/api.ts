import axios from "axios";
import cookie from "nookies";
import { toast } from "sonner";
import { loginWithToken } from "./auth";

const ivDevMode = import.meta.env.DEV;
const baseURL = ivDevMode
  ? "http://localhost:3333"
  : import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(async (config) => {
  const token = cookie.get(null, "@campanha/auth");

  if (token["@campanha/auth"]) {
    config.headers.Authorization = `Bearer ${token["@campanha/auth"]}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.config.headers.Authorization) {
      toast.error("Sua sessão expirou. Faça login novamente.");
      window.location.href = "/";
      return Promise.reject(error);
    }

    const token = error.config.headers.Authorization.split(" ")[1];

    if (error.response.status === 401) {
      loginWithToken(token);
      return api.request(error.config);
    }
    return Promise.reject(error);
  }
);
