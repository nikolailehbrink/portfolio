"use client";

import { toPlainText } from "@portabletext/react";
import { useEffect, useState } from "react";
import slugify from "slugify";

import { cn } from "@/lib/utils";
import { HeadingBlock } from "@/types";

export default function TableOfContents({
  outline,
}: {
  outline: HeadingBlock[];
}) {
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: "5% 0px -90% 0px" }
    );

    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  return (
    <ol className="my-1 flex flex-col relative gap-1 last-of-type:mb-1 [&_ol>li]:ml-5">
      {outline.map((heading) => {
        const headingText = toPlainText(heading);
        const headingSlug = slugify(headingText);
        const isActive = headingSlug === activeHeading;

        return (
          <li key={heading._key}>
            <a
              className={cn(
                "inline-flex",
                isActive ? "text-blue-400" : "hover:text-orange"
              )}
              href={`#${headingSlug}`}
            >
              {headingText}
            </a>
            {heading.subheadings.length > 0 && (
              <TableOfContents outline={heading.subheadings} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
