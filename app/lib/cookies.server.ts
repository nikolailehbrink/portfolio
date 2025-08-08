import { createCookie } from "react-router";
import { createTypedCookie } from "remix-utils/typed-cookie";
// TODO: Update to zod/v4 when remix-utils supports it
import { z } from "zod";

let messageCookieSecret = process.env.MESSAGE_COOKIE_SECRET;
if (!messageCookieSecret) {
  messageCookieSecret = "default_secret";
  console.warn(
    "MESSAGE_COOKIE_SECRET is not set. Using default secret for message count cookie.",
  );
}

const SECONDS_TO_CHAT_AGAIN = import.meta.env.PROD
  ? 60 * 60 * 24 // 24 hours
  : 60; // 1 minute

const messageCountSchema = z.coerce.number().nonnegative().nullable();

const messageCountCookie = createCookie("messageCount", {
  httpOnly: true,
  maxAge: SECONDS_TO_CHAT_AGAIN,
  sameSite: "lax",
  secrets: [messageCookieSecret],
  secure: import.meta.env.PROD,
});

export const typedMessageCountCookie = createTypedCookie({
  cookie: messageCountCookie,
  schema: messageCountSchema,
});
