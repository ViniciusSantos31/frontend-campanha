import { useAuth } from "@hooks/useAuth";
import { getAuthToken } from "@utils/getToken";
import { Navigate } from "react-router-dom";
import { HomeProvider } from "./provider";
import { HomeRequester } from "./requester";

export const Home: React.FC = () => {
  const { user } = useAuth();

  if (!user || !getAuthToken()) return <Navigate to="/" />;

  console.log("import.meta.env.BACKEND_URL", import.meta.env.MODE);

  return user?.userType === "PROVIDER" ? <HomeProvider /> : <HomeRequester />;
};
