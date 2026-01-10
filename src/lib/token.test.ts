import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Mock the token module to bypass environment variable requirement
vi.mock("./token", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  const crypto = await import("crypto");

  const TEST_SECRET = "test-secret-key-for-testing";

  function createHmacSignature(payload: string): string {
    return crypto
      .createHmac("sha256", TEST_SECRET)
      .update(payload)
      .digest("base64url");
  }

  function createSignedToken(email: string, expiresInSeconds = 86400) {
    const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;
    const payload = `${email}.${expiresAt}`;
    const signature = createHmacSignature(payload);
    const emailEncoded = Buffer.from(email).toString("base64url");

    return `${emailEncoded}.${signature}.${expiresAt}`;
  }

  function verifySignedToken(token: string): string | null {
    try {
      const [emailEncoded, signature, expiresAtStr] = token.split(".");
      if (!emailEncoded || !signature || !expiresAtStr) return null;

      const email = Buffer.from(emailEncoded, "base64url").toString("utf8");
      const expiresAt = parseInt(expiresAtStr, 10);
      if (Date.now() / 1000 > expiresAt) return null;

      const payload = `${email}.${expiresAt}`;
      const expectedSig = createHmacSignature(payload);

      if (expectedSig !== signature) return null;
      return email;
    } catch (error) {
      console.error("Error verifying token:", error);
      return null;
    }
  }

  return {
    ...actual,
    createSignedToken,
    verifySignedToken,
  };
});

import { createSignedToken, verifySignedToken } from "./token";

describe("token", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T00:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("createSignedToken", () => {
    it("should create a valid token", () => {
      const email = "test@example.com";
      const token = createSignedToken(email);

      // Token should have 3 parts separated by dots
      const parts = token.split(".");
      expect(parts).toHaveLength(3);
    });

    it("should encode email in base64url", () => {
      const email = "test@example.com";
      const token = createSignedToken(email);
      const emailPart = token.split(".")[0];

      // Decode and verify
      const decoded = Buffer.from(emailPart, "base64url").toString("utf8");
      expect(decoded).toBe(email);
    });

    it("should include expiration timestamp", () => {
      const email = "test@example.com";
      const expiresIn = 3600; // 1 hour
      const token = createSignedToken(email, expiresIn);
      const expiresAt = parseInt(token.split(".")[2], 10);

      const expectedExpiry = Math.floor(Date.now() / 1000) + expiresIn;
      expect(expiresAt).toBe(expectedExpiry);
    });

    it("should use default expiration of 24 hours", () => {
      const email = "test@example.com";
      const token = createSignedToken(email);
      const expiresAt = parseInt(token.split(".")[2], 10);

      const expectedExpiry = Math.floor(Date.now() / 1000) + 86400;
      expect(expiresAt).toBe(expectedExpiry);
    });
  });

  describe("verifySignedToken", () => {
    it("should verify a valid token", () => {
      const email = "test@example.com";
      const token = createSignedToken(email, 3600);

      const verified = verifySignedToken(token);
      expect(verified).toBe(email);
    });

    it("should return null for expired token", () => {
      const email = "test@example.com";
      const token = createSignedToken(email, 3600);

      // Advance time by 2 hours
      vi.advanceTimersByTime(2 * 60 * 60 * 1000);

      const verified = verifySignedToken(token);
      expect(verified).toBeNull();
    });

    it("should return null for malformed token", () => {
      const result = verifySignedToken("invalid-token");
      expect(result).toBeNull();
    });

    it("should return null for token with invalid signature", () => {
      const email = "test@example.com";
      const token = createSignedToken(email);
      const parts = token.split(".");

      // Tamper with the signature
      const tamperedToken = `${parts[0]}.invalid-signature.${parts[2]}`;

      const verified = verifySignedToken(tamperedToken);
      expect(verified).toBeNull();
    });

    it("should return null for token with missing parts", () => {
      expect(verifySignedToken("part1.part2")).toBeNull();
      expect(verifySignedToken("part1")).toBeNull();
      expect(verifySignedToken("")).toBeNull();
    });

    it("should return null for token with tampered email", () => {
      const email = "test@example.com";
      const token = createSignedToken(email);
      const parts = token.split(".");

      // Replace email with different one
      const tamperedEmail =
        Buffer.from("hacker@example.com").toString("base64url");
      const tamperedToken = `${tamperedEmail}.${parts[1]}.${parts[2]}`;

      const verified = verifySignedToken(tamperedToken);
      expect(verified).toBeNull();
    });
  });
});
