import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import { Radio, WifiOff } from "lucide-react";
import React from "react";

export const HomeProvider: React.FC = () => {
  const [online, setOnline] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const toggleStatus = () => {
    setLoading(true);
    setTimeout(() => {
      setOnline((prev) => !prev);
      setLoading(false);
    }, Math.random() * 1000 + 500);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Header />
      <div className="h-full flex flex-col items-center justify-center">
        <div
          id="home-provider-content"
          className="flex flex-col items-center space-y-4 px-4"
        >
          {online ? (
            <Radio
              size={100}
              className="text-emerald-600 animate-pulse"
            />
          ) : (
            <WifiOff
              size={100}
              className="animate-fade-in"
            />
          )}

          <div className="w-auto flex flex-col items-center justify-center gap-2">
            <span
              className={cn(
                "font-sans text-lg font-semibold max-w-lg text-center",
                online && "max-w-sm"
              )}
            >
              {online
                ? "Você está atualmente online. Agora pode receber chamados."
                : "Você está atualmente offline. Por favor, conecte-se para receber chamados."}
            </span>
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
