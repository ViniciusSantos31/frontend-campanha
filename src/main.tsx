import { createRoot } from "react-dom/client";

import { StrictMode, lazy } from "react";
import { AuthProvider } from "./contexts/auth.tsx";
import { ThemeProvider } from "./contexts/theme.tsx";
import "./global.css";

const App = lazy(() => import("./App.tsx"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
