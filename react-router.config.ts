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
    href("/blog/tailwind-css-tips"),
    href("/privacy-policy"),
    href("/legal-notice"),
  ],
} satisfies Config;
