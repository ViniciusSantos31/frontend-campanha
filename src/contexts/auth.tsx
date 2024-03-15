import { User } from "@/types/user";
import { ILoginSchema } from "@validations/login";
import { createContext, useState } from "react";
import { login, logout } from "services/auth";

import { useAuthStore } from "store/auth";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  user: User | null;
  isLoading?: boolean;
  login: (data: ILoginSchema) => void;
  logout: () => void;
};

const initialState: AuthProviderState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: () => {},
  logout: () => {},
} as AuthProviderState;

export const AuthContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children }: AuthProviderProps) {
  const { user, saveUser, deleteUser } = useAuthStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);

  const submitLogin = async (data: ILoginSchema) => {
    try {
      setIsLoading(true);
      const response = await login(data);

      if (response) {
        saveUser(response.user);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    deleteUser();
  };

  return (
    <AuthContext.Provider
      value={{ user, login: submitLogin, logout: handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
