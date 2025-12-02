import type { KnipConfig } from "knip";

export default {
  compilers: {
    css: (text: string) => {
      // https://github.com/webpro-nl/knip/issues/1008#issuecomment-2756572278
      text = text.replace("@plugin", "@import");
      return [...text.matchAll(/(?<=@)import[^;]+/g)].join("\n");
    },
  },
  ignoreBinaries: ["dotenv"],
  ignoreFiles: ["src/layouts/LegalLayout.astro"],
  // @react-email/preview-server is used for email previews only
  // @typescript-eslint/parser is used to make ESLint VSCode Extension work in Astro files: https://github.com/ota-meshi/eslint-plugin-astro?tab=readme-ov-file#-installation
  // @astrojs/check is used for Astro type checking
  // sharp is used for image processing in local builds
  ignoreDependencies: [
    "@react-email/preview-server",
    "@typescript-eslint/parser",
    "@astrojs/check",
    "sharp",
  ],
  // https://github.com/webpro-nl/knip/issues/1149#issuecomment-2994091874
  commitlint: true,
} satisfies KnipConfig;
