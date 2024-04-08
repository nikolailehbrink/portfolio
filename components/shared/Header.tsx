"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { CustomPortableText } from "@/components/shared/CustomPortableText";

interface HeaderProps {
  centered?: boolean;
  description?: any[];
  title?: string;
}
export function Header(props: HeaderProps) {
  const container = useRef(null);
  const titleRef = useRef(null);
  useGSAP(
    () => {
      gsap.from(titleRef.current, {
        y: 50,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: container },
  ); // <
  const { title, description, centered = false } = props;
  if (!description && !title) {
    return null;
  }
  return (
    <div
      ref={container}
      className={`${centered ? "text-center" : "w-5/6 lg:w-3/5"}`}
    >
      {/* Title */}
      {title && (
        <div
          ref={titleRef}
          className="text-3xl font-extrabold tracking-tight md:text-5xl"
        >
          {title}
        </div>
      )}
      {/* Description */}
      {description && (
        <div className="mt-4 font-serif text-xl text-gray-600 md:text-2xl">
          <CustomPortableText value={description} />
        </div>
      )}
    </div>
  );
}
