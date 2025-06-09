import { createCookie } from "react-router";
import { z } from "zod";
import { createTypedCookie } from "remix-utils/typed-cookie";

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

export const messageCountSchema = z.coerce.number().nonnegative().nullable();

const messageCountCookie = createCookie("messageCount", {
  maxAge: SECONDS_TO_CHAT_AGAIN,
  httpOnly: true,
  secure: import.meta.env.PROD,
  secrets: [messageCookieSecret],
  sameSite: "lax",
});

export const typedMessageCountCookie = createTypedCookie({
  cookie: messageCountCookie,
  schema: messageCountSchema,
});
