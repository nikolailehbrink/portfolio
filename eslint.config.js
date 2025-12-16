// @ts-check

import path from "path";
import { includeIgnoreFile } from "@eslint/compat";
import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import astro from "eslint-plugin-astro";
// @ts-expect-error The plugin does not have types defined
import jsxA11y from "eslint-plugin-jsx-a11y";
import { defineConfig } from "eslint/config";

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore");

const baseConfig = defineConfig({
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.stylistic,
  ],
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
  rules: {
    "@typescript-eslint/array-type": ["error", { default: "generic" }],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "object-shorthand": ["error", "always"],
    "no-useless-rename": "error",
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    eqeqeq: ["error", "always"],
    curly: ["error", "all"],
  },
});

const reactConfig = defineConfig({
  files: ["**/*.tsx", "**/*.jsx"],
  extends: [
    reactHooks.configs.flat.recommended,
    react.configs.flat.recommended,
    react.configs.flat["jsx-runtime"],
  ],
  languageOptions: {
    globals: {
      ...globals.browser,
    },
  },
  rules: {
    "react/jsx-no-comment-textnodes": "off",
    "react/boolean-prop-naming": [
      "error",
      {
        rule: "^(is|has|show|as)[A-Z]([A-Za-z0-9]?)+",
        message:
          'Boolean prop names should start with "is", "has", "show", or "as" followed by a capital letter.',
      },
    ],
    "react/button-has-type": "error",
    "react/self-closing-comp": ["error", { component: true, html: true }],
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "never", children: "never" },
    ],
  },
  settings: { react: { version: "detect" } },
});

const jsxA11yConfig = defineConfig({
  files: ["**/*.tsx", "**/*.jsx"],
  ...jsxA11y.flatConfigs.recommended,
});

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  baseConfig,
  ...astro.configs.recommended,
  reactConfig,
  jsxA11yConfig,
);
