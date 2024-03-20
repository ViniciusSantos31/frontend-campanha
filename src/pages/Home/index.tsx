import { useAuth } from "@hooks/useAuth";
import { getAuthToken } from "@utils/getToken";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import socket from "services/socket";
import { HomeProvider } from "./provider";
import { HomeRequester } from "./requester";

export const Home: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    socket.connect().emit("user_connected", { user });
  }, [user]);

  if (!user || !getAuthToken()) return <Navigate to="/" />;

  return user?.userType === "PROVIDER" ? <HomeProvider /> : <HomeRequester />;
};
