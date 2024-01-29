import { codeToHtml } from "shiki";
import CopyToClipboard from "./CopyToClipboard";

export type CodeProps = {
  filename?: string;
  _type: "code";
  _key: string;
  language: string;
  highlightedLines?: number[];
  code: string;
};

export default async function Code({
  value: { language, code, filename },
}: {
  value: CodeProps;
}) {
  const html = await codeToHtml(code, { lang: language, theme: "nord" });
  return (
    <div className="overflow-hidden rounded-xl bg-gradient-to-r from-blue-200 to-blue-400 p-4 !pr-0 prose-pre:my-0 prose-pre:rounded-none md:p-8 lg:p-12">
      <div className="overflow-hidden rounded-s-lg">
        <div className="flex items-center justify-between bg-gradient-to-r from-neutral-900 to-neutral-800 py-2 pl-2 pr-4 text-sm">
          <span className="-mb-[calc(0.5rem+2px)] rounded-t-lg border-2 border-white/5 border-b-border bg-neutral-800 px-4 py-2 ">
            {filename ? filename : "nikolailehbr.ink"}
          </span>
          <CopyToClipboard text={code} />
        </div>
        <div
          className="border-t-2 border-border prose-pre:!bg-neutral-900 prose-pre:leading-snug prose-pre:scrollbar-thin"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>
    </div>
  );
}
