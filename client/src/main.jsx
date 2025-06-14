import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PainelIrrigacao from "./pages/PainelIrrigacao.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PainelIrrigacao />
  </StrictMode>,
);
