import cookie from "nookies";

export const getAuthToken = (): string | null => {
  return cookie.get(null, "@campanha/auth")[`@campanha/auth`] || null;
};
