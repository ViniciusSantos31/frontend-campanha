import { createRoot } from "react-dom/client";

import { StrictMode } from "react";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/auth.tsx";
import { ThemeProvider } from "./contexts/theme.tsx";
import "./global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
