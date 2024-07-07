import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import type { BundledLanguage, Highlighter } from "shiki/bundle/web";
import { createHighlighter } from "shiki/bundle/web";
import { supportedLanguages } from "./helpers";

let highlighter: Highlighter;

export async function highlightCode(code: string, lang: BundledLanguage) {
  if (!highlighter) {
    highlighter = await createHighlighter({
      langs: supportedLanguages.map((lang) => lang.value),
      themes: ["ayu-dark"],
    });
  }

  return highlighter.codeToHtml(code, {
    lang,
    theme: "ayu-dark",
    transformers: [transformerNotationHighlight(), transformerNotationDiff()],
  });
}

export function transformCode(
  code: string,
  {
    highlightedLines,
    removedLines,
    addedLines,
  }: {
    highlightedLines?: number[];
    removedLines?: number[];
    addedLines?: number[];
  },
) {
  return code
    .split("\n")
    .map((line, index) => {
      const lineNumber = index + 1;

      if (highlightedLines?.includes(lineNumber)) {
        return line + "// [!code highlight]";
      }

      if (removedLines?.includes(lineNumber)) {
        return line + "// [!code --]";
      }

      if (addedLines?.includes(lineNumber)) {
        return line + "// [!code ++]";
      }
      return line;
    })
    .join("\n");
}
