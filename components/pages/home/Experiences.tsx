import { gsap, useGSAP } from "@/lib/gsap";
import { tailwindConfig } from "@/tailwind.config";
import type { ExperiencePayload } from "@/types/sanity";
import { useRef } from "react";
import WorkExperience from "./WorkExperience";

export default function Experiences({
  experiences,
}: {
  experiences: ExperiencePayload[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray("#work-places li") as HTMLDivElement[];
      boxes.forEach((box) => {
        const q = gsap.utils.selector(box);
        const logo = box.querySelector(".sticky")!;
        const topValue = getComputedStyle(logo).getPropertyValue("top") ?? 0;

        gsap.to(logo.querySelector(".company-logo"), {
          borderColor: tailwindConfig.theme.colors.white,
          duration: 0.2,
          backgroundColor: tailwindConfig.theme.colors.orange[500],
          scrollTrigger: {
            start: "top " + topValue,
            end: "bottom " + topValue,
            trigger: box,
            toggleActions: "play reverse restart reverse",
          },
        });

        gsap.from(q(".content, .company-logo"), {
          autoAlpha: 0,
          y: tailwindConfig.theme.spacing[24],
          scrollTrigger: {
            trigger: box,
            scrub: 1,
            end: "bottom 75%",
            toggleActions: "play none none reverse",
          },
        });
        gsap.from(q(".background-fill"), {
          y: tailwindConfig.theme.spacing[24],
          scrollTrigger: {
            trigger: box,
            scrub: 1,
            end: "bottom 75%",
            toggleActions: "play none none reverse",
          },
        });
      });
      gsap.to(".line", {
        height: "100%",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 2,
          toggleActions: "play none none reverse",
          // markers: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} id="work-places" className="relative max-lg:ml-6">
      <div
        className="line absolute top-14 h-0 w-[3px] bg-gradient-to-b
          from-orange-500 via-orange-900 via-70% to-transparent sm:-left-[2px]"
      ></div>
      <div
        className="line absolute top-14 h-0 w-[6px] bg-gradient-to-b
          from-orange-500 via-orange-900 via-70% to-transparent opacity-50
          blur-[6px] sm:-left-[3px]"
      ></div>
      <ol className="relative flex flex-col gap-8">
        {experiences.length > 0 &&
          experiences.map((experience) => (
            <WorkExperience key={experience._id} experience={experience} />
          ))}
      </ol>
    </div>
  );
}
