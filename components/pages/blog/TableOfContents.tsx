import ListOlAlt from "@/assets/icons/unicons/list-ol-alt.svg";
import type { HeadingBlock } from "@/types/sanity.js";
import Outline from "./Outline.tsx";

type Props = { headings: HeadingBlock[]; afterLinkClick?: () => void };
export default function TableOfContents({ headings, afterLinkClick }: Props) {
  return (
    <>
      <header className="relative flex items-center gap-2">
        <ListOlAlt className="w-5" />
        <h2 className="text-xl font-bold">Table of Contents</h2>
      </header>
      <Outline headings={headings} afterLinkClick={afterLinkClick} />
    </>
  );
}
