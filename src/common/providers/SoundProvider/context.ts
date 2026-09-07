import { createContext } from "react";

interface SoundProviderState {
  soundEnabled: boolean;
  setSoundEnabled: (_enabled: boolean) => void;
}

const initialState: SoundProviderState = {
  soundEnabled: true,
  setSoundEnabled: () => null,
};

export const SoundProviderContext =
  createContext<SoundProviderState>(initialState);
