import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import rehypeShiki from "@shikijs/rehype";
import rehypeSlug from "rehype-slug";
import rehypeExtractToc from "@stefanprobst/rehype-extract-toc";
import rehypeExtractTocExport from "@stefanprobst/rehype-extract-toc/mdx";
import svgr from "vite-plugin-svgr";
import { qrcodeNetwork } from "./app/lib/vite/plugin-qrcode-network";
import { transformerCodeBlock } from "./app/lib/shiki/transformerCodeBlock";
import devtoolsJson from "vite-plugin-devtools-json";
import arraybuffer from "vite-plugin-arraybuffer";
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
} from "@shikijs/transformers";
import { transformerMetaDiff } from "./app/lib/shiki/transformerMetaDiff";
import { defineConfig, withFilter } from "vite";

export default defineConfig(({ command }) => ({
  server: {
    open: true,
    host: true,
  },
  ssr: {
    // https://github.com/phosphor-icons/react/issues/45
    noExternal: command === "build" ? ["@phosphor-icons/react"] : undefined,
  },
  resolve: {
    tsconfigPaths: true,
  },
  experimental: {
    // Needed for resolve.tsconfigPaths to work
    enableNativePlugin: true,
  },
  plugins: [
    qrcodeNetwork(),
    devtoolsJson(),
    arraybuffer(),
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
        rehypeExtractToc,
        // Explicitly set the export name to "tableOfContents" for clarity and future flexibility.
        // Note: This disables React Fast Refresh due to multiple component exports, so HMR is currently off.
        // To enable HMR, consider changing the export name to "handle", which is whitelisted by the React Router plugin.
        // TODO:
        [rehypeExtractTocExport, { name: "tableOfContents" }],
      ],
      providerImportSource: "@mdx-js/react",
    }),
    withFilter(
      svgr({
        svgrOptions: {
          plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
          svgoConfig: {
            plugins: ["removeDimensions"],
          },
        },
      }),
      { load: { id: /\.svg\?react$/ } },
    ),
    tailwindcss(),
    reactRouter(),
  ],
}));
