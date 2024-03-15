import { LoginResponse } from "@/types/user";
import cookie from "nookies";
import { toast } from "sonner";
import { api } from "./api";

type LoginData = {
  email: string;
  password: string;
};

async function login({
  email,
  password,
}: LoginData): Promise<LoginResponse | undefined> {
  try {
    const response = await api.post<LoginResponse>("/api/login", {
      email,
      password,
    });

    cookie.set(null, "@campanha/auth", response.data.token, {
      maxAge: 30 * 24 * 60 * 60, // 1 month
      path: "/",
    });

    return response.data;
  } catch (error) {
    toast.error("Falha ao autenticar-se. Tente novamente.");
  }
}

async function loginWithToken(token: string) {
  try {
    const response = await api.post<LoginResponse>("/api/loginWithToken", {
      token,
    });

    cookie.set(null, "@campanha/auth", response.data.token, {
      maxAge: 30 * 24 * 60 * 60, // 1 month
      path: "/",
    });

    return response.data;
  } catch {
    toast.error("Falha ao autenticar-se. Tente novamente.");
  }
}

async function logout() {
  await api.post("/api/logout");
  cookie.destroy(null, "@campanha/auth");
}

export { login, loginWithToken, logout };
