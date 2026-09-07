import { useState } from "react";

import { SoundProviderContext } from "./context";

interface SoundProviderProps {
  children: React.ReactNode;
  storageKey?: string;
}

export function SoundProvider({
  children,
  storageKey = "sound-enabled",
}: SoundProviderProps) {
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
    const stored = localStorage.getItem(storageKey);
    return stored === null ? true : stored === "true";
  });

  const setSoundEnabled = (enabled: boolean) => {
    localStorage.setItem(storageKey, String(enabled));
    setSoundEnabledState(enabled);
  };

  return (
    <SoundProviderContext.Provider value={{ soundEnabled, setSoundEnabled }}>
      {children}
    </SoundProviderContext.Provider>
  );
}
