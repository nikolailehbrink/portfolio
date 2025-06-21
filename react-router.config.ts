import { vercelPreset } from "@vercel/react-router/vite";
import type { Config } from "@react-router/dev/config";

const vercelConfig = {
  // In order to make the local preview work, because the preset changes the server index path
  ...(process.env.VERCEL ? { presets: [vercelPreset()] } : {}),
  prerender: [
    "/privacy-policy",
    "/legal-notice",
    "/blog/batch-mails-deno-postmark",
    "/blog/tailwind-css-tips",
    "/blog/syntax-highlighting-shiki-next-js",
    "/blog/fonts-remix-react-router-7",
  ],
} satisfies Config;

export default {
  ...vercelConfig,
} satisfies Config;
