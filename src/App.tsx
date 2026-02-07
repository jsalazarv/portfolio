import { RouterProvider } from "react-router-dom";

import { router } from "./routes/Router";

import { ThemeProvider } from "@/common/providers/ThemeProvider";
import config from "@/config";

function App() {
  const storageKey = `${config.storage.prefix}Theme`;

  return (
    <ThemeProvider defaultTheme="system" storageKey={storageKey}>
      <RouterProvider router={router} />{" "}
    </ThemeProvider>
  );
}

export default App;
