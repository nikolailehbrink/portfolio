import mdx from "@mdx-js/rollup";
import { reactRouter } from "@react-router/dev/vite";
import rehypeShiki from "@shikijs/rehype";
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
} from "@shikijs/transformers";
import rehypeExtractToc from "@stefanprobst/rehype-extract-toc";
import rehypeExtractTocExport from "@stefanprobst/rehype-extract-toc/mdx";
import tailwindcss from "@tailwindcss/vite";
import rehypeSlug from "rehype-slug";
import { defineConfig } from "vite";
import arraybuffer from "vite-plugin-arraybuffer";
import devtoolsJson from "vite-plugin-devtools-json";
import svgr from "vite-plugin-svgr";

import { transformerCodeBlock } from "./app/lib/shiki/transformerCodeBlock";
import { transformerMetaDiff } from "./app/lib/shiki/transformerMetaDiff";
import { qrcodeNetwork } from "./app/lib/vite/plugin-qrcode-network";

export default defineConfig(({ command }) => ({
  experimental: {
    // Needed for resolve.tsconfigPaths to work
    enableNativePlugin: true,
  },
  plugins: [
    qrcodeNetwork(),
    devtoolsJson(),
    arraybuffer(),
    mdx({
      providerImportSource: "@mdx-js/react",
      rehypePlugins: [
        [
          rehypeShiki,
          {
            // support inline syntax highlighting
            inline: "tailing-curly-colon",
            theme: "dark-plus",
            transformers: [
              transformerMetaDiff(),
              transformerMetaWordHighlight(),
              transformerMetaHighlight(),
              transformerCodeBlock(),
            ],
          },
        ],
        rehypeSlug,
        rehypeExtractToc,
        // Explicitly set the export name to "tableOfContents" for clarity and future flexibility.
        // Note: This disables React Fast Refresh due to multiple component exports, so HMR is currently off.
        // To enable HMR, consider changing the export name to "handle", which is whitelisted by the React Router plugin.
        // TODO:
        [rehypeExtractTocExport, { name: "tableOfContents" }],
      ],
    }),
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
  ],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    host: true,
    open: true,
  },
  ssr: {
    // https://github.com/phosphor-icons/react/issues/45
    noExternal: command === "build" ? ["@phosphor-icons/react"] : undefined,
  },
}));
