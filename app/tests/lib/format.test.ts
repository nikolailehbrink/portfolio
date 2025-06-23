import { formatDate } from "@/lib/format";
import { describe, expect, it } from "vitest";

describe("The formatDate() function", () => {
  it("should format a date correctly", () => {
    const date = new Date("2023-10-01T12:00:00Z");
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("Oct 01, 2023");
  });
  it("should format a date string correctly", () => {
    const dateString = "2023-10-01T12:00:00Z";
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe("Oct 01, 2023");
  });
  it("should format a timestamp correctly", () => {
    const timestamp = 1696166400000; // Corresponds to "2023-10-01T12:00:00Z"
    const formattedDate = formatDate(timestamp);
    expect(formattedDate).toBe("Oct 01, 2023");
  });
  it("should handle invalid date inputs gracefully", () => {
    const invalidDate = "invalid-date-string";
    expect(() => formatDate(invalidDate)).toThrowError();
  });
  it("should allow custom date formatting options", () => {
    const date = new Date("2023-10-01T12:00:00Z");
    const options = {
      year: "2-digit",
      month: "long",
      day: "2-digit",
    } satisfies Intl.DateTimeFormatOptions;
    const formattedDate = formatDate(date, options);
    console.log(formattedDate);

    expect(formattedDate).toBe("October 01, 23");
  });
});
