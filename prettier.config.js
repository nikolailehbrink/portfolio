/** @type {import("prettier").Config} */
const functions = ["cn", "clsx", "cva"];
module.exports = {
  tailwindFunctions: functions,
  customFunctions: functions,
  endingPosition: "absolute-with-indent",
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-classnames",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-merge",
  ],
};
