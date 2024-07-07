"use client";

import type { HeadingBlock } from "@/types/sanity";
import { toPlainText } from "@portabletext/react";
import clsx from "clsx";
import Link from "next/link";
import slugify from "slugify";

export default function Outline({
  headings,
  afterLinkClick,
  activeHeading,
}: {
  headings: HeadingBlock[];
  afterLinkClick?: () => void;
  activeHeading: string | null;
}) {
  return (
    <ol
      className="relative my-1 flex flex-col gap-1 last-of-type:mb-1
        [&_ol>li]:ml-5"
    >
      {headings.map((heading) => {
        const headingText = toPlainText(heading);
        const slug = slugify(headingText);
        const isActive = slug === activeHeading;

        return (
          <li key={heading._key}>
            <Link
              onClick={afterLinkClick}
              className={clsx(
                "inline-flex",
                isActive ? "text-sky-400" : "hover:text-orange-500",
              )}
              href={`#${slug}`}
            >
              {headingText}
            </Link>
            {heading.subheadings.length > 0 && (
              <Outline
                headings={heading.subheadings}
                afterLinkClick={afterLinkClick}
                activeHeading={activeHeading}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
