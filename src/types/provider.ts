export type Provider = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  doc: string;
  status: "ON" | "OFF" | "WAITING" | "BUSY";
};

export type ListProviderProps = {
  providers: Provider[];
  loading?: boolean;
};

export type ProviderInfoProps = {
  value: string;
  label: string;
};
