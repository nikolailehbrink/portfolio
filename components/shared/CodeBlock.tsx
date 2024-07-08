import { highlightCode, transformCode } from "@/lib/shiki";
import { cn } from "@/lib/utils";
import { FolderSimple } from "@phosphor-icons/react/dist/ssr";
import { Fragment } from "react";
import type { BundledLanguage } from "shiki/bundle/web";
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
  filename,
  highlightedLines,
  removedLines,
  addedLines,
}: Props) {
  const transformedCode = transformCode(code, {
    highlightedLines,
    removedLines,
    addedLines,
  });

  const filenames = filename?.split("/");

  const html = await highlightCode(transformedCode, language);

  return (
    <div
      className="not-prose overflow-hidden rounded-lg bg-gradient-to-br
        from-sky-300 to-sky-500 p-4 !pr-0 md:p-8 lg:p-8 [&>pre]:rounded-none"
    >
      <div className="overflow-hidden rounded-s-lg">
        <div
          className={cn(
            `flex items-center bg-gradient-to-r from-neutral-900 to-neutral-800
            py-2 pl-2 pr-4`,
            filename ? "justify-between" : "justify-end",
          )}
        >
          {filenames && filenames.length > 0 && (
            <div
              className="divide -mb-[calc(0.5rem+1px)] inline-flex items-center
                gap-[2px] rounded-t-lg border-2 border-white/5 border-b-border
                bg-neutral-800 px-3 py-2 text-sm leading-none text-neutral-400"
            >
              {filenames.map((name, index) => {
                const isLastElement = filenames.length - 1 === index;
                return isLastElement ? (
                  <span key={index} className="inline-flex items-center">
                    {name}
                  </span>
                ) : (
                  <Fragment key={index}>
                    <span className="inline-flex items-center gap-[2px]">
                      <FolderSimple weight="duotone" />
                      {name}
                    </span>
                    <span>/</span>
                  </Fragment>
                );
              })}
            </div>
          )}
          <CopyToClipboard text={code} />
        </div>
        <div
          className="border-t-2 border-border text-sm [&>pre]:overflow-x-auto
            [&>pre]:!bg-neutral-900 [&>pre]:py-3 [&>pre]:pl-4 [&>pre]:pr-5
            [&>pre]:leading-snug [&>pre]:scrollbar-thin [&_code]:block
            [&_code]:w-fit [&_code]:min-w-full"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>
    </div>
  );
}
