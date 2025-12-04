export function estimateReadingTime(text?: string) {
  if (!text) {
    return 0;
  }
  const wordsPerMinute = 200; // Average reading speed
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export type ReadingTime = ReturnType<typeof estimateReadingTime>;
