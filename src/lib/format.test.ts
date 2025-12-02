import { describe, it, expect } from "vitest";
import { formatDate } from "./format";
import { locale } from "@/consts";

describe("formatDate", () => {
  it("formats a Date object with default options", () => {
    const date = new Date("2024-06-01");
    const result = formatDate(date);
    expect(result).toBe(
      new Intl.DateTimeFormat(locale, {
        year: "numeric",
        day: "2-digit",
        month: "short",
      }).format(date),
    );
  });

  it("formats a string date", () => {
    const dateStr = "2024-06-01";
    const result = formatDate(dateStr);
    expect(result).toBe(
      new Intl.DateTimeFormat(locale, {
        year: "numeric",
        day: "2-digit",
        month: "short",
      }).format(new Date(dateStr)),
    );
  });

  it("formats a timestamp", () => {
    const timestamp = Date.UTC(2024, 5, 1); // June 1, 2024
    const result = formatDate(timestamp);
    expect(result).toBe(
      new Intl.DateTimeFormat(locale, {
        year: "numeric",
        day: "2-digit",
        month: "short",
      }).format(new Date(timestamp)),
    );
  });

  it("formats with custom options", () => {
    const date = new Date("2024-06-01");
    const options = { year: "2-digit", month: "long" } as const;
    const result = formatDate(date, options);
    expect(result).toBe(new Intl.DateTimeFormat(locale, options).format(date));
  });

  it("throws on invalid date string", () => {
    expect(() => formatDate("not-a-date")).toThrow("Invalid date provided");
  });

  it("throws on invalid date number", () => {
    expect(() => formatDate(NaN)).toThrow("Invalid date provided");
  });

  it("throws on invalid Date object", () => {
    expect(() => formatDate(new Date("invalid"))).toThrow(
      "Invalid date provided",
    );
  });
});
