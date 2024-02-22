import { User } from "@/types/user";
import React, { createContext } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  user: User | null;
};

const initialState: AuthProviderState = {
  user: null,
};

export const AuthContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children }: AuthProviderProps) {
  const user: User = {
    id: "1",
    email: "jondoe@email.com",
    name: "John Doe",
    role: "PROVIDER",
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
