import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import CopyToClipboardButton from "./CopyToClipboardButton";

// Mock analytics
vi.mock("@vercel/analytics", () => ({
  track: vi.fn(),
}));

describe("CopyToClipboardButton", () => {
  let mockClipboard: { writeText: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Mock clipboard API
    mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };
    Object.defineProperty(navigator, "clipboard", {
      value: mockClipboard,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render with default state", () => {
    render(<CopyToClipboardButton code="const foo = 'bar';" />);
    const button = screen.getByRole("button", {
      name: "Copy code to clipboard",
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Copy to clipboard");
  });

  it("should have correct accessibility attributes", () => {
    render(<CopyToClipboardButton code="test" />);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("tabIndex", "0");
    expect(button).toHaveAttribute("aria-label");
    expect(button).toHaveAttribute("title");
  });

  it("should apply correct CSS classes", () => {
    render(<CopyToClipboardButton code="test" />);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("absolute");
    expect(button).toHaveClass("top-2");
    expect(button).toHaveClass("right-2");
    expect(button).toHaveClass("rounded-md");
  });

  it("should render with code prop", () => {
    const code = "console.log('hello');";
    render(<CopyToClipboardButton code={code} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
