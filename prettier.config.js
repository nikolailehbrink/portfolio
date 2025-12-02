const functions = ["cn", "clsx", "cva", "tw", "autolinkHeadings"];

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  tailwindFunctions: functions,
  tailwindAttributes: ["tw"],
  customFunctions: functions,
  tailwindStylesheet: "./src/styles/global.css",
  endingPosition: "absolute",
  plugins: [
    "prettier-plugin-astro",
    // https://www.nikolailehbr.ink/blog/tailwind-css-tips#Automatic-wrapping-of-long-class-names
    "prettier-plugin-tailwindcss",
    "prettier-plugin-classnames",
    "prettier-plugin-merge",
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      files: "*svg",
      options: {
        parser: "html",
      },
    },
  ],
  semi: true,
  tabWidth: 2,
  singleQuote: false,
};
