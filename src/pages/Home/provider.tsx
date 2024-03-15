import { Header } from "@components/header";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { useAuth } from "@hooks/useAuth";
import { cn } from "@utils/cn";
import { WifiOff } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import NotificationAudio from "@assets/sounds/notification.mp3";
import { getFallbackAvatar } from "@utils/getFallbackAvatar";

export const HomeProvider: React.FC = () => {
  const [online, setOnline] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleStatus = () => {
    setLoading(true);
    setTimeout(() => {
      setOnline((prev) => !prev);
      setLoading(false);
    }, Math.random() * 1000 + 500);
  };

  const receiveCall = useCallback(async () => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 5000 + 3000)
    );

    const audioElement = new Audio(NotificationAudio);

    toast.success("Você tem um novo chamado!", {
      description: "Clique para atender",
      duration: 5000,
      onAutoClose() {
        toast.error("Chamado ignorado!", {
          duration: 2000,
        });
      },
      cancel: {
        label: "Ignorar",
        onClick: () => {
          toast.error("Chamado ignorado!", {
            duration: 2000,
          });
        },
      },
      action: {
        label: "Atender",
        onClick: () => {
          toast.loading("Chamado atendido!", {
            description: "Você será redirecionado para a conferência.",
          });

          new Promise((resolve) =>
            setTimeout(resolve, Math.random() * 5000 + 3000)
          ).then(() => {
            window.location.href = "/";
          });
        },
      },
    });

    audioElement.play();
  }, []);

  useEffect(() => {
    if (online) {
      receiveCall();
    }
  }, [online, receiveCall]);

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Header />
      <div className="h-full flex flex-col items-center justify-center">
        <div
          id="home-provider-content"
          className="flex flex-col items-center space-y-6 px-4"
        >
          <AvatarStatus online={online} />
          <div className="w-auto flex flex-col items-center justify-center gap-4 z-20">
            <div className="flex flex-col items-center justify-center animate-fade-in">
              <span className="font-sans text-lg font-semibold max-w-lg text-center">
                {`Você está ${online ? "online" : "offline"}`}
              </span>
              {online ? (
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
              variant={online ? "outline" : "default"}
              className={cn("w-full sm:w-auto")}
              onClick={toggleStatus}
              loading={loading}
            >
              {online ? "Fique offline" : "Fique online!"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AvatarStatus: React.FC<{ online: boolean }> = ({ online }) => {
  const { user } = useAuth();

  return (
    <div className="relative flex items-center justify-center">
      <div
        id="bg-pulse-radar"
        className={cn(
          "hidden absolute bg-emerald-200 pointer-events-none dark:bg-emerald-800 rounded-full size-32",
          online && "flex animate-radar-pulse"
        )}
      />
      <div
        id="bg-pulse-radar"
        className={cn(
          "hidden absolute bg-emerald-200 pointer-events-none dark:bg-emerald-800 rounded-full size-32 delay-1000",
          online && "flex animate-radar-pulse"
        )}
      />
      {!online && (
        <WifiOff
          size={30}
          className="absolute shadow-lg animate-out bottom-0 right-0 z-10 text-background bg-foreground rounded-full p-1 opacity-75"
        />
      )}
      <Avatar
        className={cn(
          "grayscale opacity-75 size-32 transition-opacity delay-75 select-none",
          online && "grayscale-0 opacity-100"
        )}
      >
        <AvatarImage src={user?.avatar_url} />
        <AvatarFallback className="text-4xl font-bold">
          {user && getFallbackAvatar(user)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
