import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import node from "@astrojs/node";
import db from "@astrojs/db";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import arraybuffer from "vite-plugin-arraybuffer";

// https://docs.astro.build/en/guides/markdown-content/#heading-ids-and-plugins
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import {
  transformerMetaDiff,
  transformerMetaHighlight,
} from "./src/lib/shiki/transformerMeta";
import { transformerCodeBlock } from "./src/lib/shiki/transformerCodeBlock";
import { transformerLineNumbers } from "./src/lib/shiki/transformerLineNumbers";
import { transformerMetaWordHighlight } from "./src/lib/shiki/transformerMetaWordHighlight";

const PRODUCTION_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL;

const site = PRODUCTION_URL
  ? new URL(`https://${PRODUCTION_URL}`).href
  : "https://www.nikolailehbr.ink/";

export default defineConfig({
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
      () =>
        rehypeAutolinkHeadings({
          // Has to be inside the heading, because the font-size for the anchor adjusts to the heading
          behavior: "prepend",
          content: {
            type: "text",
            value: "#",
          },
          properties: {
            class: `not-prose px-1 transition-opacity select-none
              group-target:opacity-100 focus:opacity-100 max-sm:hidden
              sm:absolute sm:-translate-x-full sm:opacity-0
              sm:group-hover:opacity-100`,
            "aria-label": "Link to this heading",
          },
          headingProperties: { class: "group relative text-balance" },
        }),
    ],
    shikiConfig: {
      theme: "dark-plus",
      transformers: [
        transformerLineNumbers(),
        transformerMetaDiff(),
        transformerMetaHighlight(),
        transformerMetaWordHighlight(),
        transformerCodeBlock(),
      ],
    },
  },
  prefetch: true,
  site,
  redirects: {
    "/blog/tailwind-css-tips": "/blog/tailwindcss-v3-tips",
  },
  integrations: [
    mdx({
      optimize: {
        ignoreElementNames: ["pre", "img"],
      },
    }),
    sitemap({
      filter: (page) => !page.includes("/newsletter/"),
    }),
    react(),
    db(),
  ],
  vite: {
    plugins: [tailwindcss(), arraybuffer()],
  },
  server: {
    open: true,
    host: true,
  },
  // Local preview doesnt work with Vercel adapter, but with Node
  adapter: process.env.VERCEL
    ? vercel({
        imageService: true,
        skewProtection: true,
      })
    : node({
        mode: "standalone",
      }),
});
