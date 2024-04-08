"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";

import { resolveHref } from "@/sanity/lib/utils";
import type { MenuItem, SettingsPayload } from "@/types";

interface NavbarProps {
  data: SettingsPayload;
}
export default function Navbar(props: NavbarProps) {
  const { data } = props;
  const menuItems = data?.menuItems || ([] as MenuItem[]);

  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from("a", {
        x: 150,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="sticky top-0 z-10 flex flex-wrap items-center gap-x-5 px-4 py-4 backdrop-blur md:px-16 md:py-5 lg:px-32"
    >
      <Link href="/chat">Chat</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/studio">Studio</Link>
      {menuItems &&
        menuItems.map((menuItem, key) => {
          const href = resolveHref(menuItem?._type, menuItem?.slug);
          if (!href) {
            return null;
          }
          return (
            <Link
              key={key}
              className={` ${
                menuItem?._type === "home" ? "font-extrabold " : "text-gray-600"
              }`}
              href={href}
            >
              {menuItem.title}
            </Link>
          );
        })}
    </div>
  );
}
