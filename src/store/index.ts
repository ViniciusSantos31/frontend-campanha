import { User } from "@/types/user";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  saveUser: (user: User) => void;
  deleteUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        saveUser: (user: User) => set({ user }),
        deleteUser: () => set({ user: null }),
      }),
      {
        name: "@campanha-auth/persist",
      }
    )
  )
);
