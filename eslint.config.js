import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import perfectionist from "eslint-plugin-perfectionist";
import reactPlugin from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import path from "path";
import tseslint from "typescript-eslint";

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore");

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  eslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  tseslint.configs.recommended,
  perfectionist.configs["recommended-natural"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      formComponents: ["Form"],
      linkComponents: [
        { linkAttribute: "to", name: "Link" },
        { linkAttribute: "to", name: "NavLink" },
      ],
      react: {
        version: "detect",
      },
    },
  },
  reactPlugin.configs.flat.recommended, // This is not a plugin object, but a shareable config object
  reactPlugin.configs.flat["jsx-runtime"],
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    rules: {
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
    },
  },
  {
    files: ["./app/routes/**/*.tsx"],
    rules: {
      "perfectionist/sort-modules": [
        "error",
        {
          customGroups: [
            {
              anyOf: [
                {
                  elementNamePattern: "loader",
                  selector: "function",
                },
              ],
              groupName: "loader",
            },
            {
              anyOf: [
                {
                  elementNamePattern: "action",
                  selector: "function",
                },
              ],
              groupName: "action",
            },
            {
              groupName: "unsorted-functions",
              selector: "function",
              type: "unsorted",
            },
          ],
          groups: [
            "declare-enum",
            "export-enum",
            "enum",
            ["declare-interface", "declare-type"],
            ["export-interface", "export-type"],
            ["interface", "type"],
            "declare-class",
            "class",
            "export-class",
            "declare-function",
            "loader",
            "action",
            "unsorted-functions",
          ],
        },
      ],
    },
  },
  {
    rules: {
      "no-useless-rename": "error",
      "object-shorthand": ["error", "always"],
      "perfectionist/sort-union-types": [
        "error",
        {
          groups: [
            "conditional",
            "function",
            "import",
            "intersection",
            "keyword",
            "literal",
            "named",
            "object",
            "operator",
            "tuple",
            "union",
            "nullish",
          ],
        },
      ],
    },
  },
);
