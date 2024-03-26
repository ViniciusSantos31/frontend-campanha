export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  cpf: string;
  doc: string;
  email: string;
  userType: "REQUESTER" | "PROVIDER";
  status: "AVAILABLE" | "OFFLINE" | "PAUSED" | "BUSY";
  companyId: string;
  token_jwt: string;
  avatarUrl: string;
  watcher_id: string;
  inQueueSince: Date | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: User;
  refreshToken: string;
  token: string;
}
