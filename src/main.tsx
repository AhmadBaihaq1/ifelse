import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./gaya/utama.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
