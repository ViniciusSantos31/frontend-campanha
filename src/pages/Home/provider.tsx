import { Header } from "@components/header";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { useAuth } from "@hooks/useAuth";
import { cn } from "@utils/cn";
import { WifiOff } from "lucide-react";

import { useAvailability } from "@hooks/useAvailability";
import { getFallbackAvatar } from "@utils/getFallbackAvatar";
import { useEffect } from "react";
import { me } from "services/users";

export const HomeProvider: React.FC = () => {
  const { handleCreateRoom, isLoading } = useAvailability();
  const { user: provider } = useAuth();

  useEffect(() => {
    me();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center overflow-x-hidden">
      <Header />
      <div className="h-full flex flex-col items-center justify-center">
        <div
          id="home-provider-content"
          className="flex flex-col items-center space-y-6 px-4"
        >
          <AvatarStatus />
          <div className="w-auto flex flex-col items-center justify-center gap-4 z-20">
            <div className="flex flex-col items-center justify-center animate-fade-in">
              <span className="font-sans text-lg font-semibold max-w-lg text-center">
                {`Você está ${
                  provider?.status === "AVAILABLE" ? "online" : "offline"
                }`}
              </span>
              {provider?.status === "AVAILABLE" ? (
                <p className="text-gray-400 text-center animate-slide-left">
                  Agora você pode receber chamados.
                </p>
              ) : (
                <p className="text-gray-400 text-center animate-slide-right">
                  Por favor, conecte-se para receber chamados.
                </p>
              )}
            </div>
            <Button
              variant={provider?.status === "AVAILABLE" ? "outline" : "default"}
              className={cn("w-full sm:w-auto")}
              onClick={handleCreateRoom}
              loading={isLoading}
            >
              {provider?.status === "AVAILABLE"
                ? "Fique offline"
                : "Fique online!"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AvatarStatus: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="relative flex items-center justify-center">
      <div
        id="bg-pulse-radar"
        className={cn(
          "hidden absolute bg-emerald-200 pointer-events-none dark:bg-emerald-800 rounded-full size-32",
          user?.status === "AVAILABLE" && "flex animate-radar-pulse"
        )}
      />
      <div
        id="bg-pulse-radar"
        className={cn(
          "hidden absolute bg-emerald-200 pointer-events-none dark:bg-emerald-800 rounded-full size-32 delay-1000",
          user?.status === "AVAILABLE" && "flex animate-radar-pulse"
        )}
      />
      {user?.status === "OFFLINE" && (
        <WifiOff
          size={30}
          className="absolute shadow-lg animate-out bottom-0 right-0 z-10 text-background bg-foreground rounded-full p-1 opacity-75"
        />
      )}
      <Avatar
        className={cn(
          "grayscale opacity-75 size-32 transition-opacity delay-75 select-none",
          user?.status === "AVAILABLE" && "grayscale-0 opacity-100"
        )}
      >
        <AvatarImage src={user?.avatarUrl} />
        <AvatarFallback className="text-4xl font-bold">
          {user && getFallbackAvatar(user)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
