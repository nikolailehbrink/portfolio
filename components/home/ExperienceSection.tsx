import Experience from "@/public/icons/experience.svg";
import { EXPERIENCES_QUERY } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/lib/store";
import type { SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { dataset, projectId } from "@/sanity/env";
import ExpertiseGrid from "./ExpertiseGrid";

const builder = imageUrlBuilder({ projectId, dataset });

export default async function ExperienceSection() {
  const { data: experiences } =
    await loadQuery<SanityDocument[]>(EXPERIENCES_QUERY);

  return (
    <section id="experience" className="flex items-center bg-neutral-950">
      <div className="container grid gap-6 lg:grid-cols-2 lg:gap-12 lg:py-24">
        <div
          id="experience-content"
          className="flex flex-col items-start gap-4 self-start lg:sticky lg:top-24"
        >
          <div className="badge badge-orange">
            <Experience />
            Work Experience
          </div>
          <h2 className="text-5xl font-bold">My Journey</h2>
          <p>
            This section provides an overview of my work history and the various
            software and tools I have used so far.
          </p>
          <ExpertiseGrid />
        </div>

        <ol
          id="work-places"
          className="flex flex-col gap-8 border-l-[3px] border-white/10 max-lg:mx-4 "
        >
          {experiences
            .toSorted((a, b) => {
              const dateA = a.period.to ? new Date(a.period.from) : new Date();
              const dateB = b.period.to ? new Date(b.period.from) : new Date();
              return dateB.getTime() - dateA.getTime();
            })
            .map((experience, index) => {
              const period = [
                new Date(experience.period.from),
                experience.period.to
                  ? new Date(experience.period.to)
                  : new Date(),
              ];
              const options = { year: "numeric", month: "long" } as const;
              const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
              const formattedPeriod = period
                .map((date) => dateTimeFormat.format(date))
                .join(" - ");

              return (
                <li key={index} className="-ml-6 flex gap-4 lg:gap-8">
                  <div className="sticky top-4 flex h-12 w-12 shrink-0 justify-center rounded-full border-2 border-transparent bg-blue-500 p-3 shadow-[0_0_0_8px] shadow-neutral-950 lg:top-24">
                    <Image
                      className="w-12 object-contain -hue-rotate-[50deg]"
                      src={builder
                        .image(experience.company.logo)
                        .format("webp")
                        .width(64)
                        .url()}
                      alt={`Logo of ${experience.company.name}`}
                      height={64}
                      width={64}
                    />
                  </div>
                  <div className="mt-[5.5px] flex flex-col items-start gap-3">
                    <span className="rounded-full bg-blue px-3 py-2 text-sm">
                      {formattedPeriod}
                    </span>

                    <hgroup>
                      <h2 className="text-2xl font-bold">{experience.title}</h2>
                      <a
                        href={experience.company.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {experience.company.name}
                      </a>
                    </hgroup>
                    <p>{experience.description}</p>
                  </div>
                </li>
              );
            })}
        </ol>
      </div>
    </section>
  );
}
