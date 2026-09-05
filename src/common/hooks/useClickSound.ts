import { useRef, useCallback } from "react";

export function useClickSound(src = "/sounds/click.mp3") {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.volume = 0.4;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, [src]);

  return play;
}
