import type { PropsWithChildren } from "react";

import "@/i18n";

import { SoundProvider } from "@/common/providers/SoundProvider";
import { ThemeProvider } from "@/common/providers/ThemeProvider";
import config from "@/config";

export function AppProviders({ children }: PropsWithChildren) {
  const themeStorageKey = `${config.storage.prefix}Theme`;
  const soundStorageKey = `${config.storage.prefix}Sound`;

  return (
    <ThemeProvider defaultTheme="system" storageKey={themeStorageKey}>
      <SoundProvider storageKey={soundStorageKey}>{children}</SoundProvider>
    </ThemeProvider>
  );
}
