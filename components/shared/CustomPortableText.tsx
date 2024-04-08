"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";
import { useRef } from "react";
import type { Image } from "sanity";

import ImageBox from "@/components/shared/ImageBox";
import { TimelineSection } from "@/components/shared/TimelineSection";

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string;
  value: PortableTextBlock[];
}) {
  const blockRef = useRef(null);

  useGSAP(() => {
    gsap.from(blockRef.current, {
      y: 100,
      autoAlpha: 0,
      duration: 1,
      ease: "power3.out",
    });
  });

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return (
          <p ref={blockRef} className={`${paragraphClasses}`}>
            {children}
          </p>
        );
      },
    },
    marks: {
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
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string };
      }) => {
        return (
          <div className="my-6 space-y-2">
            <ImageBox
              image={value}
              alt={value.alt}
              classesWrapper="relative aspect-[16/9]"
            />
            {value?.caption && (
              <div className="font-sans text-sm text-gray-600">
                {value.caption}
              </div>
            )}
          </div>
        );
      },
      timeline: ({ value }) => {
        const { items } = value || {};
        return <TimelineSection timelines={items} />;
      },
    },
  };

  return <PortableText components={components} value={value} />;
}
