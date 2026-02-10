import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import { router } from "./routes/Router";

import { ThemeProvider } from "@/common/providers/ThemeProvider";
import config from "@/config";

function App() {
  const storageKey = `${config.storage.prefix}Theme`;

  return (
    <ThemeProvider defaultTheme="system" storageKey={storageKey}>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors closeButton />
    </ThemeProvider>
  );
}

export default App;
