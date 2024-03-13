import { User } from "@/types/user";
import { createContext } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  user: User | null;
};

const initialState: AuthProviderState = {
  user: null,
  isAuthenticated: false,
} as AuthProviderState;

export const AuthContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children }: AuthProviderProps) {
  const user: User = {
    uuid: "1",
    email: "jondoe@email.com",
    firstName: "John",
    lastName: "Doe",
    userType: "REQUESTER",
    avatar_url: "https://avatars.githubusercontent.com/u/41171735?v=4",
    company: "Company",
    cpf: "12345678900",
    doc: "12345678900",
    phone: "12345678900",
    createdAt: "2021-08-01T00:00:00.000Z",
    status: "ACTIVE",
    token_jwt: "token",
    updatedAt: "2021-08-01T00:00:00.000Z",
    watcher_id: "1",
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
