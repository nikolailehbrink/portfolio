import type { KnipConfig } from "knip";

export default {
  // dotenv-cli should be installed globally and not in the repo
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
  commitlint: true,
} satisfies KnipConfig;
