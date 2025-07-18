import { vercelPreset } from "@vercel/react-router/vite";
import type { Config } from "@react-router/dev/config";
import { href } from "react-router";

export default {
  // In order to make the local preview work, because the preset changes the server index path
  ...(process.env.VERCEL ? { presets: [vercelPreset()] } : {}),
  prerender: [
    href("/blog/batch-mails-deno-postmark"),
    href("/blog/fonts-remix-react-router-7"),
    href("/blog/sitemap-react-router-7"),
    href("/blog/syntax-highlighting-shiki-next-js"),
    href("/blog/tailwindcss-v3-tips"),
    href("/blog/tailwindcss-v4-tips"),
    href("/blog/realistic-button-design-css"),
    href("/privacy-policy"),
    href("/legal-notice"),
  ],
} satisfies Config;
