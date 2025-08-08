/** @type {import("prettier").Config} */
const functions = ["cn", "clsx", "cva", "tw"];
export default {
  customFunctions: functions,
  endingPosition: "absolute-with-indent",
  plugins: [
    // https://www.nikolailehbr.ink/blog/tailwind-css-tips#Automatic-wrapping-of-long-class-names
    "prettier-plugin-tailwindcss",
    "prettier-plugin-classnames",
    "prettier-plugin-merge",
  ],
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  tailwindAttributes: ["tw"],
  tailwindFunctions: functions,
  tailwindStylesheet: "./app/app.css",
};
