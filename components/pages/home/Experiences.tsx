import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { tailwindConfig } from "@/tailwind.config";
import { ExperiencePayload } from "@/types/sanity";

import WorkExperience from "./WorkExperience";

export default function Experiences({
  experiences,
}: {
  experiences: ExperiencePayload[];
}) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray("#work-places li") as HTMLOListElement[];
      boxes.forEach((box) => {
        const logo = box.querySelector(".sticky")!;
        const topValue = getComputedStyle(logo).getPropertyValue("top") ?? 0;

        gsap.to(logo, {
          borderColor: tailwindConfig.theme.colors.white,
          duration: 0.2,
          backgroundColor: tailwindConfig.theme.colors.orange.DEFAULT,
          scrollTrigger: {
            start: "top " + topValue,
            end: "bottom " + topValue,
            trigger: box,
            toggleActions: "play reverse restart reverse",
          },
        });

        gsap.from(box, {
          autoAlpha: 0,
          x: tailwindConfig.theme.spacing[8],
          y: tailwindConfig.theme.spacing[8],
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
          start: "top 75%",
          end: "bottom 25%",
          scrub: 2,
        },
      });
    },
    { scope: ref }
  );

  return (
    <ol
      ref={ref}
      id="work-places"
      className="flex flex-col gap-8 relative  max-lg:mx-4 "
    >
      <div className="-left-[2px] w-[3px] top-14 h-0 bg-gradient-to-b from-orange-500 via-orange-900 via-70% to-transparent absolute line"></div>
      {/* <div className="-left-[2px] w-[3px] h-0 bg-sky-500 absolute line"></div> */}
      {experiences.length > 0 &&
        experiences.map((experience) => (
          <WorkExperience key={experience._id} experience={experience} />
        ))}
    </ol>
  );
}
