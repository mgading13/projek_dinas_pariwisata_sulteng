import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App"; // ganti ke App
import "leaflet/dist/leaflet.css";
import { Toaster } from "@/components/ui/sonner";
import './i18n';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster richColors position="top-center" duration={3000} />
    </BrowserRouter>
  </StrictMode>
);
