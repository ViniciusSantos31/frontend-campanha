import { ProconLogo } from "@assets/procon-logo";
import { Toaster } from "@components/ui/sonner";
import { Loader } from "lucide-react";

import { me } from "services/users";
import { useAuthStore } from "store/auth";
import "./services/socket";
import socket from "./services/socket";

import RoutesApp from "./routes";

function App() {
  const { user } = useAuthStore.getState();

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
        duration={5000}
        className="z-999"
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
