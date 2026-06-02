export const SITE_TITLE = "Nikolai Lehbrink";
export const SITE_DESCRIPTION =
  "Passionate fullstack developer dedicated to creating beautiful and functional web applications.";

export const AI_CHAT_MESSAGE_LIMIT = import.meta.env.PROD ? 20 : 5;
export const SECONDS_TO_CHAT_AGAIN = import.meta.env.PROD
  ? 1000 * 60 * 60 * 24 // 24 hours
  : 1000 * 60; // 1 minute

// Hard caps to keep the public AI chat endpoint from being abused with huge
// payloads (each request is billed against the AI Gateway).
export const MAX_CHAT_MESSAGES = 50;
export const MAX_CHAT_INPUT_CHARS = 24000;

export const locale = "en-US";

export const THEME_COLOR = "#0ea5e9";

export const RESEND_NEWSLETTER_AUDIENCE_ID =
  "1a231b09-a625-43c1-9cc2-5d8f34972bdb";
