import { createRoot } from "react-dom/client";

import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { queryClient } from "services/queryClient.ts";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/auth.tsx";
import { ThemeProvider } from "./contexts/theme.tsx";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <ReactQueryDevtools
            position="bottom"
            buttonPosition="bottom-left"
            client={queryClient}
          />
          <App />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
