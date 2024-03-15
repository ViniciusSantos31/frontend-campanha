export interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  phone: string;
  cpf: string;
  doc: string;
  email: string;
  userType: "REQUESTER" | "PROVIDER";
  status: string;
  company: string;
  token_jwt: string;
  avatar_url: string;
  watcher_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}
