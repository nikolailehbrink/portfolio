export const SITE_TITLE = "Nikolai Lehbrink";
export const SITE_DESCRIPTION =
  "Passionate fullstack developer dedicated to creating beautiful and functional web applications.";

export const AI_CHAT_MESSAGE_LIMIT = import.meta.env.PROD ? 20 : 2;
export const SECONDS_TO_CHAT_AGAIN = import.meta.env.PROD
  ? 1000 * 60 * 60 * 24 // 24 hours
  : 1000 * 60; // 1 minute

export const locale = "en-US";

export const THEME_COLOR = "#0ea5e9";

export const RESEND_NEWSLETTER_AUDIENCE_ID =
  "1a231b09-a625-43c1-9cc2-5d8f34972bdb";
