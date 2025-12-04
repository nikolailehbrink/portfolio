import { describe, it, expect } from "vitest";
import { slugify } from "./utils";

describe("slugify", () => {
  it("should trim spaces and convert to lowercase", () => {
    expect(slugify("  Hello World  ")).toBe("hello-world");
  });

  it("should replace all spaces with hyphens", () => {
    expect(slugify("foo bar baz")).toBe("foo-bar-baz");
  });

  it("should handle empty string", () => {
    expect(slugify("")).toBe("");
  });

  it("should handle string with only spaces", () => {
    expect(slugify("     ")).toBe("");
  });

  it("should handle strings with multiple consecutive spaces", () => {
    expect(slugify("foo   bar")).toBe("foo-bar");
  });

  it("should handle strings with no spaces", () => {
    expect(slugify("foobar")).toBe("foobar");
  });

  it("should handle already slugified strings", () => {
    expect(slugify("already-slugified")).toBe("already-slugified");
  });
});
