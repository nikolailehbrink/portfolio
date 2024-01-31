export function useReadingTime(text: string) {
  const words = text.split(/\s+/).length;
  const wpm = 200;
  const minutesToRead = Math.ceil(words / wpm);
  const characters = text.length;

  return { words, minutesToRead, characters };
}
