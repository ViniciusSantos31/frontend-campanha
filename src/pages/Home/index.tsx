import { useAuth } from "@hooks/useAuth";
import { HomeProvider } from "./provider";
import { HomeRequester } from "./requester";

export const Home: React.FC = () => {
  const { user } = useAuth();

  return user?.userType === "PROVIDER" ? <HomeProvider /> : <HomeRequester />;
};
