import LogoSUS from "@assets/Logo_SUS.png";
import { Toaster } from "@components/ui/sonner";
import { Loader } from "lucide-react";

import { me } from "services/users";
import { useAuthStore } from "store/auth";
import "./services/socket";
import socket from "./services/socket";

import { useTheme } from "@hooks/useTheme";
import RoutesApp from "./routes";

function App() {
  const { user } = useAuthStore.getState();
  const { theme } = useTheme();

  window.addEventListener(
    "unload",
    () => {
      socket.emit("user_close_tab");
    },
    false
  );

  window.addEventListener(
    "load",
    () => {
      if (user) me();
    },
    false
  );

  return (
    <div className="w-screen h-screen bg-background">
      <Toaster
        position="top-right"
        closeButton
        theme={theme}
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
        className="relative flex items-center flex-col"
      >
        <p className="font-sans text-3xl absolute left-0 text-secondary-foreground font-bold">
          Plantão
        </p>
        <img
          src={LogoSUS}
          alt="Logo"
          className="h-40 aspect-auto"
        />
      </aside>
      <Loader
        size={40}
        className="animate-spin"
      />
    </div>
  );
};

export default App;
