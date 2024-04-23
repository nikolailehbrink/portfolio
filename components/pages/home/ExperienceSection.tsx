"use client";

import Diary from "@/assets/icons/unicons/diary.svg";
import { gsap, useGSAP } from "@/lib/gsap";
import { tailwindConfig } from "@/tailwind.config";
import type { ExperiencePayload } from "@/types/sanity";
import { useRef } from "react";
import Experiences from "./Experiences";
import ExpertiseGrid from "./ExpertiseGrid";

export default function ExperienceSection({
  experiences,
}: {
  experiences: ExperiencePayload[];
}) {
  const ref = useRef(null);
  const q = gsap.utils.selector(ref);
  useGSAP(
    () => {
      gsap.from(q("#experience-content > *"), {
        stagger: 0.2,
        autoAlpha: 0,
        y: tailwindConfig.theme.spacing[8],
        scrollTrigger: {
          start: "top 80%",
          end: "bottom 25%",
          trigger: ref.current,
          toggleActions: "play none none reverse",
          // markers: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="experience"
      className="flex items-center bg-neutral-950"
    >
      <div className="container grid gap-6 lg:grid-cols-2 lg:gap-12 lg:py-24">
        <div
          id="experience-content"
          className="flex flex-col items-start gap-4 self-start lg:sticky
            lg:top-24"
        >
          <div className="badge badge-orange">
            <Diary />
            Experience
          </div>
          <h2 className="text-5xl font-bold">Resume</h2>
          <p className="text-muted-foreground">
            Here you can find an overview of my work history and the software
            and tools I use on a regular basis or have used in the past.
          </p>
          <ExpertiseGrid />
        </div>
        <Experiences experiences={experiences} />
      </div>
    </section>
  );
}
