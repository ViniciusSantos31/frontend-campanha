import { User } from "./user";

export type Provider = User & {
  status: "AVAILABLE" | "OFFLINE" | "PAUSED" | "BUSY";
};

export type ProviderListResponse = {
  users: Provider[];
};

export type ListProviderProps = {
  providers: Provider[];
  loading?: boolean;
};

export type ProviderInfoProps = {
  value: string;
  label: string;
};
