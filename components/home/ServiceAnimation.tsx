"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

type Props = { children: ReactNode };

gsap.registerPlugin(ScrollTrigger);
export default function ServiceAnimation({ children }: Props) {
  const section = useRef(null);

  useGSAP(
    () => {
      gsap.from(".service-box", {
        autoAlpha: 0,
        stagger: 0.5,
        y: 100,
        scrollTrigger: {
          start: "top bottom",
          end: "bottom 75%",
          scrub: 2,
          trigger: "#services .container .grid",
          toggleActions: "restart none none none",
        },
      });

      gsap.from(".service-content > *", {
        autoAlpha: 0,
        stagger: 0.2,
        // y: 30,
        x: 30,
        scrollTrigger: {
          start: "top bottom",
          end: "bottom bottom",
          scrub: 2,
          trigger: "#services .container .grid",
          toggleActions: "restart none none none",
        },
      });
    },

    { scope: section },
  );
  return (
    <section
      ref={section}
      id="services"
      className="flex items-center bg-gradient-to-b from-transparent to-neutral-950 py-8"
    >
      {children}
    </section>
  );
}
