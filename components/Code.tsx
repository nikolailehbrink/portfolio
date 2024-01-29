import Refractor from "react-refractor";
import js from "refractor/lang/javascript";
import ts from "refractor/lang/typescript";
import tsx from "refractor/lang/tsx";

Refractor.registerLanguage(js);
Refractor.registerLanguage(ts);
Refractor.registerLanguage(tsx);

export type CodeProps = {
  filename?: string;
  _type: "code";
  _key: string;
  language: string;
  highlightedLines?: number[];
  code: string;
};

export default function Code({
  value: { language, code, highlightedLines },
}: {
  value: CodeProps;
}) {
  return (
    <div className="from rounded-xl bg-gradient-to-r from-blue-200 to-blue-400 p-8 pl-12 pr-0">
      <Refractor language={language} value={code} markers={highlightedLines} />
    </div>
  );
}
