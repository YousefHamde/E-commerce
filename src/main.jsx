import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/900.css";

import "@fontsource/noto-sans/400.css";
import "@fontsource/noto-sans/500.css";
import "@fontsource/noto-sans/700.css";
import "@fontsource/noto-sans/900.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
