import { useRef, useCallback } from "react";

import { useSoundEnabled } from "./useSoundEnabled";

export function useClickSound(src = "/sounds/click.mp3", force = false) {
  const { soundEnabled } = useSoundEnabled();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (!force && !soundEnabled) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.volume = 0.4;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, [src, soundEnabled, force]);

  const stop = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }, []);

  return { play, stop };
}
