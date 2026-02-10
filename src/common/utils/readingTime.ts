const WORDS_PER_MINUTE = 200;

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / WORDS_PER_MINUTE);
  return minutes;
}

export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return "1 min de lectura";
  }
  return `${minutes} min de lectura`;
}
