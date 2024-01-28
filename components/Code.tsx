import Refractor from "react-refractor";
import js from "refractor/lang/javascript";

Refractor.registerLanguage(js);

type Props = {
  _type: string;
  language: string;
  highlightedLines: number[];
  code: string;
  filename: string;
};

export default function Code(props: Props) {
  return (
    <Refractor
      // In this example, `props` is the value of a `code` field
      language={props.language}
      value={props.code}
      markers={props.highlightedLines}
    />
  );
}
