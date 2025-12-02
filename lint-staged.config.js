// @ts-check
/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{js,jsx,ts,tsx,astro,json,svg,mdx}": ["eslint", "prettier --write"],
};
