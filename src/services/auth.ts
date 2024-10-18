import { RefreshResponse } from "@/types/auth";
import { LoginResponse } from "@/types/user";
import { ISignUpSchema } from "@validations/register";
import cookie from "nookies";
import { toast } from "sonner";
import { api } from "./api";
import socket from "./socket";

type LoginData = {
  email: string;
  password: string;
};

async function login({
  email,
  password,
}: LoginData): Promise<LoginResponse | undefined> {
  try {
    const response = await api.post<LoginResponse>("/login", {
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

async function registerUser(
  data: Omit<ISignUpSchema, "passwordConfirmation">
): Promise<void> {
  try {
    await api.post<void>("/users", data);

    toast.success("Usuário cadastrado com sucesso", {
      onAutoClose: () => {
        window.location.href = "/";
      },
    });
  } catch (error) {
    if (error instanceof Error) toast.error(error.message);
  }
}

async function refreshToken() {
  const { token } = cookie.get(null);

  if (!token) return;

  try {
    const response = await api.post<RefreshResponse>("/refresh", {
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

async function loginAsGuest({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}): Promise<LoginResponse | undefined> {
  try {
    const response = await api.post<LoginResponse>("/login/guest", {
      firstName,
      lastName,
    });

    cookie.set(null, "@campanha/auth", response.data.token, {
      maxAge: 30 * 24 * 60 * 60, // 1 month
      path: "/",
    });

    cookie.set(null, "@campanha/refreshToken", response.data.refreshToken, {
      maxAge: 30 * 24 * 60 * 60, // 1 month
      path: "/",
    });

    return response.data;
  } catch {
    toast.error("Falha ao autenticar-se. Tente novamente.");
    throw new Error("Falha ao autenticar-se. Tente novamente.");
  }
}

async function logout() {
  await api.head("/logout");
  socket.disconnect();
  cookie.destroy(null, "@campanha/auth");
}

export { login, loginAsGuest, logout, refreshToken, registerUser };
