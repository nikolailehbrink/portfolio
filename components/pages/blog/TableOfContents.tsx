"use client";

import ListOlAlt from "@/assets/icons/unicons/list-ol-alt.svg";
import type { HeadingBlock } from "@/types/sanity.js";
import { useEffect, useState } from "react";
import Outline from "./Outline";

type Props = { headings: HeadingBlock[]; afterLinkClick?: () => void };
export default function TableOfContents({ headings, afterLinkClick }: Props) {
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

    const headings = document.querySelectorAll("h2, h3, h4");

    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  return (
    <>
      <header className="relative flex items-center gap-2">
        <ListOlAlt className="w-5" />
        <h2 className="text-xl font-bold">Table of Contents</h2>
      </header>
      <Outline
        headings={headings}
        afterLinkClick={afterLinkClick}
        activeHeading={activeHeading}
      />
    </>
  );
}
