export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  cpf: string;
  doc: string;
  email: string;
  userType: "REQUESTER" | "PROVIDER";
  status: string;
  companyId: string;
  token_jwt: string;
  avatar_url: string;
  watcher_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
