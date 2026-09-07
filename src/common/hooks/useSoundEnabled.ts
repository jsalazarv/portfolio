import { useContext } from "react";

import { SoundProviderContext } from "@/common/providers/SoundProvider/context";

export function useSoundEnabled() {
  return useContext(SoundProviderContext);
}
