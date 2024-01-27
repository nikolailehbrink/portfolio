"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
};
export default function HeaderAnimation({ children }: Props) {
  const section = useRef(null);

  useGSAP(
    () => {
      gsap.from("#header-illustration", {
        scale: 0.2,
        autoAlpha: 0,
        ease: "power2.out",
      });
      gsap.from(".bubble", {
        scale: 0.3,
        rotate: -25,
        scrollTrigger: {
          trigger: "#header-illustration",
          scrub: 1,
        },
        stagger: 0.1,
      });
      gsap.from("#gradient-blur", {
        rotate: 270,
        scrollTrigger: {
          start: "top top",
          scrub: 2,
          trigger: section.current,
        },
      });
    },

    { scope: section },
  );
  return (
    <section
      ref={section}
      id="header"
      className="flex items-center overflow-x-clip"
    >
      {children}
    </section>
  );
}
