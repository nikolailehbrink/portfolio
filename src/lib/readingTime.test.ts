import { describe, it, expect } from "vitest";
import { estimateReadingTime } from "./readingTime";

describe("estimateReadingTime", () => {
  it("returns 0 for undefined input", () => {
    expect(estimateReadingTime(undefined)).toBe(0);
  });

  it("returns 0 for empty string", () => {
    expect(estimateReadingTime("")).toBe(0);
  });

  it("calculates reading time for a short text", () => {
    const text = "This is a short sentence.";
    // 5 words, 200 wpm => 5/200 = 0.025, ceil = 1
    expect(estimateReadingTime(text)).toBe(1);
  });

  it("calculates reading time for exactly 200 words", () => {
    const text = Array(200).fill("word").join(" ");
    expect(estimateReadingTime(text)).toBe(1);
  });

  it("calculates reading time for 201 words", () => {
    const text = Array(201).fill("word").join(" ");
    expect(estimateReadingTime(text)).toBe(2);
  });

  it("trims whitespace and splits correctly", () => {
    const text = "   word   word   word   ";
    // 3 words
    expect(estimateReadingTime(text)).toBe(1);
  });

  it("handles multiple spaces and newlines", () => {
    const text = "word\nword\tword  word";
    // 4 words
    expect(estimateReadingTime(text)).toBe(1);
  });
});
