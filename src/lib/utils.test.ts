import { describe, it, expect } from "vitest";
import { cn, slugify } from "./utils";

describe("cn", () => {
  it("should merge class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("should handle conditional classes", () => {
    const condition = false;
    expect(cn("foo", condition && "bar", "baz")).toBe("foo baz");
  });

  it("should merge Tailwind classes correctly", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("should handle empty input", () => {
    expect(cn()).toBe("");
  });

  it("should handle arrays", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });

  it("should handle objects", () => {
    expect(cn({ foo: true, bar: false })).toBe("foo");
  });
});

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
