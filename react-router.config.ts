import type { Config } from "@react-router/dev/config";

import { vercelPreset } from "@vercel/react-router/vite";
import { href } from "react-router";

import { isDraft } from "./app/lib/utils";

export default {
  prerender({ getStaticPaths }) {
    const paths = getStaticPaths();
    const publishedPosts = paths.filter(
      (path) => path.startsWith("/blog/") && !isDraft(path),
    );
    return [href("/privacy-policy"), href("/legal-notice"), ...publishedPosts];
  },
  // In order to make the local preview work, because the preset changes the server index path
  presets: process.env.VERCEL ? [vercelPreset()] : undefined,
} satisfies Config;
