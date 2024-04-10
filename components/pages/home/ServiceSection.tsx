"use client";
import Link from "next/link";
import { useRef } from "react";

import Desktop from "@/assets/icons/unicons/desktop.svg";
import { gsap, useGSAP } from "@/lib/gsap";
import { tailwindConfig } from "@/tailwind.config";
import { ServicePayload } from "@/types/sanity";

import ServiceGrid from "./ServiceGrid";

export default function ServiceSection({
  services,
}: {
  services: ServicePayload[];
}) {
  const ref = useRef(null);
  const q = gsap.utils.selector(ref);

  useGSAP(
    () => {
      gsap.from(q(".service-box"), {
        autoAlpha: 0,
        stagger: 0.5,
        y: tailwindConfig.theme.spacing[32],
        scrollTrigger: {
          start: "top bottom",
          end: "bottom 75%",
          scrub: 2,
          trigger: ".container .grid",
          toggleActions: "restart none none none",
        },
      });

      gsap.from(q("#service-content > *"), {
        autoAlpha: 0,
        stagger: 0.2,
        x: tailwindConfig.theme.spacing[4],
        scrollTrigger: {
          start: "top bottom",
          end: "bottom bottom",
          scrub: 2,
          trigger: q("#service-content"),
          toggleActions: "restart none none none",
          // markers: true,
        },
      });
    },
    { scope: ref }
  );
  return (
    <section
      id="passion"
      className="flex items-center bg-gradient-to-b from-transparent to-neutral-950 lg:py-24 xl:scroll-mt-16"
      ref={ref}
    >
      <div className="container grid items-start gap-6 lg:grid-cols-2 lg:gap-12">
        <div
          id="service-content"
          className="flex flex-col items-start gap-3 max-xl:relative lg:sticky lg:top-24 lg:order-1 prose dark:prose-invert prose-p:m-0 prose-headings:m-0"
        >
          <div className="badge badge-orange">
            <Desktop className="w-5" />
            Passion
          </div>
          <h2 className="text-5xl font-bold">Why the Web?</h2>
          <p>
            About 6 years ago, I created my first website as an assignment for
            the media informatics module of a degree program by the same name.
            It was the very first time I got to see{" "}
            <Link
              target="_blank"
              className="underline underline-offset-2"
              href={
                "https://chat.openai.com/share/f6f9e999-1a89-4434-a939-554ca74c2bf3"
              }
            >
              HTML and CSS
            </Link>{" "}
            and understood how to create a very simple website.
          </p>
          <p>
            The page only consisted of a single image, a heading, two paragraphs
            of text and a big background gradient all over the page – but
            however small the website was and unpleasing it looked, I had a
            blast creating it and thus found a new passion.
          </p>
          <p>
            Now, 6 years and many websites later, I have taken the time to
            fulfill my dream of creating my own personal site, which was a
            slightly more complex task – but still as much fun as all those
            years ago.
          </p>
          <p>
            Here is what I have learned over the years and what I am currently
            focusing on.
          </p>
        </div>
        <ServiceGrid services={services} />
      </div>
    </section>
  );
}
