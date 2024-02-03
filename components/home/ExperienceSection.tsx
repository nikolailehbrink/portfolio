import Diary from "@/assets/icons/unicons/diary.svg";
import { EXPERIENCES_QUERY } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/lib/store";
import ExpertiseGrid from "./ExpertiseGrid";
import type { SanityWorkExperience } from "@/types/sanity/sanityWorkExperience";
import WorkExperience from "./WorkExperience";

export default async function ExperienceSection() {
  const { data: experiences } =
    await loadQuery<SanityWorkExperience[]>(EXPERIENCES_QUERY);

  return (
    <section id="experience" className="flex items-center bg-neutral-950">
      <div className="container grid gap-6 lg:grid-cols-2 lg:gap-12 lg:py-24">
        <div
          id="experience-content"
          className="flex flex-col items-start gap-4 self-start lg:sticky lg:top-24"
        >
          <div className="badge badge-orange">
            <Diary />
            Experience
          </div>
          <h2 className="text-5xl font-bold">Resume</h2>
          <p>
            Here you can find an overview of my work history and the software
            and tools I use on a regular basis or have used in the past.
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
            .map((experience) => (
              <WorkExperience key={experience._id} experience={experience} />
            ))}
        </ol>
      </div>
    </section>
  );
}
