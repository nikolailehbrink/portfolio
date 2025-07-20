import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
import rehypeShiki from "@shikijs/rehype";
import rehypeSlug from "rehype-slug";
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
import type { UserConfig } from "vite";

export default {
  server: {
    open: true,
    host: true,
  },
  ssr: {
    // https://github.com/phosphor-icons/react/issues/45
    noExternal: ["@phosphor-icons/react"],
  },
  plugins: [
    arraybuffer(),
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
} satisfies UserConfig;
