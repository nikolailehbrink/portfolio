import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
import rehypeShiki from "@shikijs/rehype";
import rehypeSlug from "rehype-slug";
import svgr from "vite-plugin-svgr";
import { qrcodeNetwork } from "./app/lib/vite/plugin-qrcode-network";
import { transformerCodeBlock } from "./app/lib/shiki/transformerCodeBlock";
import devtoolsJson from "vite-plugin-devtools-json";

import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
} from "@shikijs/transformers";
import { transformerMetaDiff } from "./app/lib/shiki/transformerMetaDiff";

export default defineConfig(({ command }) => ({
  build: {
    rollupOptions: {
      // There was a build error related to the @forge42/seo-tools package
      // https://github.com/forge-42/seo-tools/issues/13
      // Second build error was related to the @resvg/resvg-js package "Could not load ...darwin-arm64.node"
      //  - stream did not contain valid UTF-8
      external: ["virtual:remix/server-build", "@resvg/resvg-js"],
    },
  },
  server: {
    open: true,
    host: true,
  },
  ssr: {
    noExternal: command === "build" ? true : undefined,
  },
  plugins: [
    devtoolsJson(),
    mdx({
      rehypePlugins: [
        [
          rehypeShiki,
          {
            theme: "dark-plus",
            // support inline syntax highlighting
            inline: "tailing-curly-colon",
            transformers: [
              transformerMetaDiff(),
              transformerMetaWordHighlight(),
              transformerMetaHighlight(),
              transformerCodeBlock(),
            ],
          },
        ],
        rehypeSlug,
      ],
      providerImportSource: "@mdx-js/react",
    }),
    qrcodeNetwork(),
    svgr({
      svgrOptions: {
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
        svgoConfig: {
          plugins: ["removeDimensions"],
        },
      },
    }),

    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
}));
