"use client";

import { cn } from "@/lib/utils";
import type { HeadingBlock } from "@/types/sanity";
import { toPlainText } from "@portabletext/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import slugify from "slugify";

export default function Outline({
  headings,
  afterLinkClick,
}: {
  headings: HeadingBlock[];
  afterLinkClick?: () => void;
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
      { rootMargin: "5% 0px -90% 0px" },
    );

    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  return (
    <ol className="relative my-1 flex flex-col gap-1 last-of-type:mb-1 [&_ol>li]:ml-5">
      {headings.map((heading) => {
        const headingText = toPlainText(heading);
        const slug = slugify(headingText);
        const isActive = slug === activeHeading;

        return (
          <li key={heading._key}>
            <Link
              onClick={afterLinkClick}
              className={cn(
                "inline-flex",
                isActive ? "text-sky-400" : "hover:text-orange-500",
              )}
              href={`#${slug}`}
            >
              {headingText}
            </Link>
            {heading.subheadings.length > 0 && (
              <Outline headings={heading.subheadings} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
