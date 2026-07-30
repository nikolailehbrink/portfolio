import { createHmac } from "node:crypto";
import { describe, expect, test } from "vitest";

import {
  extractMessages,
  isValidSignature,
  webhookPayloadSchema,
} from "./whatsapp";

const APP_SECRET = "test-app-secret";
const BODY = JSON.stringify({ object: "whatsapp_business_account" });

function sign(body: string, secret = APP_SECRET) {
  return `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
}

describe("isValidSignature", () => {
  test("accepts a signature created with the app secret", () => {
    expect(isValidSignature(BODY, sign(BODY), APP_SECRET)).toBe(true);
  });

  test("rejects a signature created with a different secret", () => {
    expect(isValidSignature(BODY, sign(BODY, "other"), APP_SECRET)).toBe(false);
  });

  test("rejects a valid signature for a different body", () => {
    expect(isValidSignature(`${BODY} `, sign(BODY), APP_SECRET)).toBe(false);
  });

  test("rejects a missing or malformed header", () => {
    expect(isValidSignature(BODY, null, APP_SECRET)).toBe(false);
    expect(isValidSignature(BODY, "deadbeef", APP_SECRET)).toBe(false);
    expect(isValidSignature(BODY, "sha256=", APP_SECRET)).toBe(false);
    expect(isValidSignature(BODY, "sha256=nothex", APP_SECRET)).toBe(false);
  });
});

describe("extractMessages", () => {
  test("flattens messages across entries and changes", () => {
    const payload = webhookPayloadSchema.parse({
      object: "whatsapp_business_account",
      entry: [
        {
          changes: [
            {
              field: "messages",
              value: {
                metadata: { phone_number_id: "1" },
                messages: [
                  {
                    id: "a",
                    from: "49123",
                    type: "text",
                    text: { body: "hi" },
                  },
                ],
              },
            },
            {
              field: "messages",
              value: {
                messages: [
                  {
                    id: "b",
                    from: "49123",
                    type: "audio",
                    audio: { id: "m1" },
                  },
                ],
              },
            },
          ],
        },
      ],
    });

    expect(extractMessages(payload).map(({ id }) => id)).toEqual(["a", "b"]);
  });

  test("ignores status-only payloads without dropping the request", () => {
    const payload = webhookPayloadSchema.parse({
      object: "whatsapp_business_account",
      entry: [{ changes: [{ field: "messages", value: { statuses: [] } }] }],
    });

    expect(extractMessages(payload)).toEqual([]);
  });
});
