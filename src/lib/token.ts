import { createHmac } from "crypto";

const NEWSLETTER_SECRET = import.meta.env.NEWSLETTER_SECRET;

function createHmacSignature(payload: string): string {
  if (!NEWSLETTER_SECRET) {
    throw new Error("Token secret is not defined");
  }
  return createHmac("sha256", NEWSLETTER_SECRET)
    .update(payload)
    .digest("base64url");
}

export function createSignedToken(email: string, expiresInSeconds = 86400) {
  const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const payload = `${email}.${expiresAt}`;
  const signature = createHmacSignature(payload);
  const emailEncoded = Buffer.from(email).toString("base64url");

  return `${emailEncoded}.${signature}.${expiresAt}`;
}

export function verifySignedToken(token: string): string | null {
  try {
    const [emailEncoded, signature, expiresAtStr] = token.split(".");
    if (!emailEncoded || !signature || !expiresAtStr) {
      return null;
    }

    const email = Buffer.from(emailEncoded, "base64url").toString("utf8");
    const expiresAt = parseInt(expiresAtStr, 10);
    if (Date.now() / 1000 > expiresAt) {
      return null;
    }

    const payload = `${email}.${expiresAt}`;
    const expectedSig = createHmacSignature(payload);

    if (expectedSig !== signature) {
      return null;
    }
    return email;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
