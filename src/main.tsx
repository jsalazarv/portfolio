import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./global.css";
import "./i18n";
import App from "./App.tsx";

if (import.meta.env.DEV) {
  import("./mocks/browser").then(({ worker }) => {
    worker.start({
      onUnhandledRequest: "bypass",
    });
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
