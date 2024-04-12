/** @type {import("prettier").Config} */
module.exports = {
  tailwindFunctions: ["cn", "clsx"],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};
