import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";

import CopyToClipboard from "./CopyToClipboard";

type Props = {
  code: string;
  language?: BundledLanguage;
  filename?: string;
  highlightedLines?: number[];
  removedLines?: number[];
  addedLines?: number[];
};

export default async function CodeBlock({
  code,
  language = "typescript",
  filename = "nikolailehbr.ink",
  highlightedLines,
  removedLines,
  addedLines,
}: Props) {
  const transformedCode = code
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

  const html = await codeToHtml(transformedCode, {
    lang: language,
    theme: "ayu-dark",
    transformers: [transformerNotationHighlight(), transformerNotationDiff()],
  });

  return (
    <div className="not-prose overflow-hidden rounded-lg bg-gradient-to-r from-blue-200 to-blue-400 p-4 !pr-0 md:p-8 lg:p-8 [&>pre]:rounded-none">
      <div className="overflow-hidden rounded-s-lg">
        <div className="flex items-center justify-between bg-gradient-to-r from-neutral-900 to-neutral-800 py-2 pl-2 pr-4">
          <span className="-mb-[calc(0.5rem+2px)] rounded-t-lg border-2 border-white/5 border-b-border bg-neutral-800 text-neutral-400 px-3 py-1 text-sm">
            {filename}
          </span>
          <CopyToClipboard text={code} />
        </div>
        <div
          className="border-t-2 border-border text-sm [&>pre]:overflow-x-auto [&>pre]:!bg-neutral-900 [&>pre]:py-3 [&>pre]:pl-4 [&>pre]:pr-5 [&>pre]:leading-snug [&>pre]:scrollbar-thin [&_code]:block [&_code]:w-fit [&_code]:min-w-full"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>
    </div>
  );
}
