import { Toaster } from "@components/ui/sonner";
import RoutesApp from "./routes";

function App() {
  return (
    <div className="w-screen h-screen bg-background">
      <Toaster
        position="bottom-center"
        duration={5000}
      />
      <RoutesApp />
    </div>
  );
}

export default App;
