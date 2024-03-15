import { ProconLogo } from "@assets/procon-logo";
import { Toaster } from "@components/ui/sonner";
import { useAuth } from "@hooks/useAuth";
import { Loader } from "lucide-react";
import { lazy, useEffect } from "react";
import { api } from "services/api";
import { queryClient } from "services/queryClient";

const RoutesApp = lazy(() => import("./routes"));

function App() {
  const { user } = useAuth();

  const iamAlive = () => {
    if (!user) return;
    api.post("/api/imAlive");
    queryClient.invalidateQueries({ queryKey: ["providers"] });
  };

  useEffect(() => {
    const interval = setInterval(iamAlive, 1000 * 2);

    return () => clearInterval(interval);
  });

  return (
    <div className="w-screen h-screen bg-background">
      <Toaster
        position="top-right"
        closeButton
        duration={5000}
      />
      <RoutesApp />
    </div>
  );
}

export const Loading: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6 items-center justify-center h-screen bg-background">
      <aside
        id="logo"
        className="flex items-center flex-col"
      >
        <p className="font-sans text-4xl">Plantão</p>
        <ProconLogo />
      </aside>
      <Loader
        size={40}
        className="animate-spin"
      />
    </div>
  );
};

export default App;
