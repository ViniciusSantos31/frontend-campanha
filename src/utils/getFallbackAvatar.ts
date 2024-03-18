import { User } from "@/types/user";

export const getFallbackAvatar = (user: User) => {
  return user?.firstName.charAt(0) + "" + user?.lastName.charAt(0);
};
