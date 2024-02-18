import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { ThemeProvider } from "./contexts/theme.tsx";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
