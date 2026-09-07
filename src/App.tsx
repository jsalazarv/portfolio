import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import { router } from "./routes/Router";

import { SoundProvider } from "@/common/providers/SoundProvider";
import { ThemeProvider } from "@/common/providers/ThemeProvider";
import config from "@/config";

function App() {
  const themeStorageKey = `${config.storage.prefix}Theme`;
  const soundStorageKey = `${config.storage.prefix}Sound`;

  return (
    <ThemeProvider defaultTheme="system" storageKey={themeStorageKey}>
      <SoundProvider storageKey={soundStorageKey}>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors closeButton />
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;
