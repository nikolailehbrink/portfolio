"use client";

import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";
import type { Image } from "sanity";

import LinkableHeader from "@/app/(personal)/(min-height)/blog/[slug]/components/LinkableHeader";
import ImageBox from "@/components/shared/ImageBox";
import { TimelineSection } from "@/components/shared/TimelineSection";

import CodeBlock from "./CodeBlock";

export function CustomPortableText({ value }: { value: PortableTextBlock[] }) {
  const components: PortableTextComponents = {
    block: {
      h2: LinkableHeader,
      h3: LinkableHeader,
      h4: LinkableHeader,
      h5: LinkableHeader,
      h6: LinkableHeader,
    },
    marks: {
      code: ({ children }) => (
        <code className="not-prose rounded-md border border-neutral-700 bg-neutral-800 px-[3px] py-[2px] text-sm">
          {children}
        </code>
      ),
      link: ({ children, value }) => {
        return (
          <a
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        );
      },
    },
    types: {
      code: ({ value }) => <CodeBlock {...value} />,
      image: ({ value }: { value: Image & { alt?: string } }) => {
        return <ImageBox image={value} />;
      },
      timeline: ({ value }) => {
        const { items } = value || {};
        return <TimelineSection timelines={items} />;
      },
    },
  };

  return <PortableText components={components} value={value} />;
}
