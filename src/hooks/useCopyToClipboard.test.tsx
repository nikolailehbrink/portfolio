import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCopyToClipboard } from "./useCopyToClipboard";

describe("useCopyToClipboard", () => {
  let mockClipboard: { writeText: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    vi.useFakeTimers();
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
    vi.useRealTimers();
  });

  it("should initialize with default text", () => {
    const { result } = renderHook(() => useCopyToClipboard());

    expect(result.current.copiedText).toBe("Copy to clipboard");
    expect(result.current.idle).toBe(true);
  });

  it("should initialize with custom text", () => {
    const { result } = renderHook(() => useCopyToClipboard("Click to copy"));

    expect(result.current.copiedText).toBe("Click to copy");
    expect(result.current.idle).toBe(true);
  });

  it("should copy text to clipboard", async () => {
    const { result } = renderHook(() => useCopyToClipboard());
    const textToCopy = "Hello, World!";

    await act(async () => {
      await result.current.copyToClipboard(textToCopy);
    });

    expect(mockClipboard.writeText).toHaveBeenCalledWith(textToCopy);
  });

  it("should update state after copying", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copyToClipboard("test");
    });

    expect(result.current.copiedText).toBe("Copied");
    expect(result.current.idle).toBe(false);
  });

  it("should reset state after 2 seconds", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copyToClipboard("test");
    });

    expect(result.current.copiedText).toBe("Copied");
    expect(result.current.idle).toBe(false);

    // Fast-forward time by 2 seconds
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.copiedText).toBe("Copy to clipboard");
    expect(result.current.idle).toBe(true);
  });

  it("should handle clipboard API failure", async () => {
    const consoleSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    mockClipboard.writeText.mockRejectedValueOnce(
      new Error("Clipboard API not available"),
    );

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copyToClipboard("test");
    });

    expect(result.current.copiedText).toBe("Failed to copy");
    expect(result.current.idle).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to copy:",
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });

  it("should reset to custom initial text after failure", async () => {
    const consoleSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    mockClipboard.writeText.mockRejectedValueOnce(new Error("Failed"));

    const { result } = renderHook(() => useCopyToClipboard("Custom initial"));

    await act(async () => {
      await result.current.copyToClipboard("test");
    });

    expect(result.current.copiedText).toBe("Failed to copy");

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.copiedText).toBe("Custom initial");

    consoleSpy.mockRestore();
  });
});
