export function useReadingTime(text: string) {
  const words = text.split(/\s+/).length;
  const wpm = 200;
  const minutesToRead = Math.ceil(words / wpm);
  const secondsToRead = Math.ceil(words / (wpm / 60));
  const characters = text.length;

  return { words, minutesToRead, characters, secondsToRead };
}
