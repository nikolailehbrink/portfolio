"use client";

import Archive from "@/assets/icons/unicons/archive.svg";
import { gsap, useGSAP } from "@/lib/gsap";
import { tailwindConfig } from "@/tailwind.config";
import type { ShowcaseProject } from "@/types/sanity";
import { useRef } from "react";
import ProjectCarousel from "./ProjectCarousel";

export default function ProjectSection({
  projects,
}: {
  projects: ShowcaseProject[];
}) {
  const ref = useRef<HTMLElement>(null);
  const selector = gsap.utils.selector(ref);

  useGSAP(
    () => {
      gsap.from(selector("#project-content > *"), {
        autoAlpha: 0,
        stagger: 0.2,
        y: tailwindConfig.theme.spacing[4],
        scrollTrigger: {
          start: "top bottom",
          end: "bottom bottom",
          scrub: 2,
          // markers: true,
          trigger: ref.current,
          toggleActions: "restart none none none",
        },
      });

      gsap.from(selector(".project-carousel-item")!, {
        autoAlpha: 0,
        stagger: 0.5,
        x: 50,
        scrollTrigger: {
          start: "top center",
          end: "bottom bottom",
          trigger: ref.current,
          // markers: true,
          scrub: 3,
          toggleActions: "play none reverse restart",
        },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="projects"
      className="flex flex-col justify-center gap-6 lg:gap-12 lg:py-24"
    >
      <div
        id="project-content"
        className="container flex flex-col items-start gap-4 lg:items-center"
      >
        <div className="badge badge-sky">
          <Archive />
          Projects
        </div>
        <h2 className="text-5xl font-bold">Behind the Screen</h2>
        <p className="max-w-prose text-muted-foreground lg:text-center">
          After my studies and some experience from working as a student in an
          advertising agency, I wanted to be able to take on jobs independently.
          So I filled out all the paperwork and became self-employed relatively
          quickly towards the end of 2021.
        </p>
        <p className="max-w-prose text-muted-foreground lg:text-center">
          Since then, I&apos;ve worked alongside some interesting people and
          companies, for whom I&apos;ve created the following projects.
        </p>
      </div>
      {projects.length > 0 && <ProjectCarousel projects={projects} />}
    </section>
  );
}
