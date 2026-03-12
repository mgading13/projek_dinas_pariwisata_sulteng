import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App"; // ganti ke App
import "leaflet/dist/leaflet.css";
import { Toaster } from "@/components/ui/sonner";
import "./i18n";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
      <Toaster richColors position="top-center" duration={3000} />
    </BrowserRouter>
  </StrictMode>,
);
