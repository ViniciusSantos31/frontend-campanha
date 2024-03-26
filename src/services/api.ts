import axios from "axios";
import cookie, { parseCookies } from "nookies";
import { toast } from "sonner";

const ivDevMode = import.meta.env.DEV;
const baseURL = ivDevMode
  ? "http://localhost:3333"
  : import.meta.env.VITE_BACKEND_URL;

let isRefreshing = false;

const pagesToIgnore = [
  "/",
  "/signup",
  "/recovery/request",
  "/recovery/confirm",
  "/recovery/password",
];

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
    if (pagesToIgnore.includes(window.location.pathname)) {
      return Promise.reject(error);
    }

    const cookies = parseCookies();

    if (
      error.response.status === 500 &&
      error.response.data.message === "jwt expired"
    ) {
      const { "@campanha/auth.refreshToken": refreshToken } = cookies;
      const originalConfig = error.config;

      if (!isRefreshing) {
        isRefreshing = true;

        api
          .post("/refresh", {
            refreshToken,
          })
          .then((response) => {
            cookie.set(null, "@campanha/auth", response.data.token, {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            });

            originalConfig.headers.Authorization = `Bearer ${response.data.token}`;

            return api.request(originalConfig);
          })
          .catch((err) => {
            toast.error("Sua sessão expirou. Faça login novamente.");
            window.location.href = "/";
            return Promise.reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      }
    }

    if (!error.config.headers.Authorization && error.response.status === 500) {
      toast.error("Sua sessão expirou. Faça login novamente.");
      window.location.href = "/";
      return Promise.reject(error);
    }

    // const token = error.config.headers.Authorization.replace("Bearer ", "");

    // if (error.response.status === 401) {
    //   loginWithToken(token);
    //   return api.request(error.config);
    // }

    return Promise.reject(error);
  }
);
