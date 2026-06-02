import type { KnipConfig } from "knip";

export default {
  // dotenv-cli should be installed globally and not in the repo
  ignoreBinaries: ["dotenv"],
  // LegalLayout.astro is referenced via the `layout:` frontmatter of src/pages/legal-notice.md
  // and privacy-policy.md - a string path knip can't trace (it also skips .md page entries), so it
  // would otherwise be reported as an unused file.
  ignoreFiles: ["src/layouts/LegalLayout.astro"],
  // @typescript-eslint/parser is used to make ESLint VSCode Extension work in Astro files: https://github.com/ota-meshi/eslint-plugin-astro?tab=readme-ov-file#-installation
  ignoreDependencies: ["@typescript-eslint/parser"],
  commitlint: true,
} satisfies KnipConfig;
