import axios from "axios";
import cookie from "nookies";

export const api = axios.create({
  baseURL: "http://localhost:3500",
});

api.interceptors.request.use(async (config) => {
  const token = cookie.get(null, "@campanha/auth");

  if (token["@campanha/auth"]) {
    config.headers.Authorization = `Bearer ${token["@campanha/auth"]}`;
  }

  return config;
});
