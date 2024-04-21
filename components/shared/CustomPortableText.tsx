"use client";

import AnchorHeading from "@/components/pages/blog/AnchorHeading";
import ImageBox from "@/components/shared/ImageBox";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";
import { Suspense } from "react";
import type { Image } from "sanity";
import IconLink from "../pages/blog/IconLink";
import { Skeleton } from "../ui/skeleton";
import CodeBlock from "./CodeBlock";

export function CustomPortableText({ value }: { value: PortableTextBlock[] }) {
  const components: PortableTextComponents = {
    block: {
      h2: AnchorHeading,
      h3: AnchorHeading,
      h4: AnchorHeading,
      h5: AnchorHeading,
      h6: AnchorHeading,
    },
    marks: {
      code: ({ children }) => (
        <code className="not-prose rounded-md border border-neutral-700 bg-neutral-800 px-[3px] py-[2px] text-sm">
          {children}
        </code>
      ),
      link: IconLink,
    },
    types: {
      code: ({ value }) => {
        return (
          <Suspense fallback={<Skeleton className="h-32 w-full" />}>
            <CodeBlock {...value} />
          </Suspense>
        );
      },
      image: ({ value }: { value: Image & { alt?: string } }) => {
        return <ImageBox image={value} />;
      },
    },
  };

  return <PortableText components={components} value={value} />;
}
