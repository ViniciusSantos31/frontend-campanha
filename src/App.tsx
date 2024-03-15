import { ProconLogo } from "@assets/procon-logo";
import { Toaster } from "@components/ui/sonner";
import { Loader } from "lucide-react";
import { lazy } from "react";

const RoutesApp = lazy(() => import("./routes"));

function App() {
  return (
    <div className="w-screen h-screen bg-background">
      <Toaster
        position="top-right"
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
