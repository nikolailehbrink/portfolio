import type { SanityWorkExperience } from "@/types/sanity/sanityWorkExperience";
import WorkExperience from "./WorkExperience";
import { EXPERIENCES_QUERY } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/lib/store";

export default async function WorkPlaces() {
  const { data: experiences } =
    await loadQuery<SanityWorkExperience[]>(EXPERIENCES_QUERY);
  return (
    <ol
      id="work-places"
      className="flex flex-col gap-8 border-l-[3px] border-white/10 max-lg:mx-4 "
    >
      {experiences.length > 0 &&
        experiences
          .sort((a, b) => {
            const dateA = a.period.to ? new Date(a.period.from) : new Date();
            const dateB = b.period.to ? new Date(b.period.from) : new Date();
            return dateB.getTime() - dateA.getTime();
          })
          .map((experience) => (
            <WorkExperience key={experience._id} experience={experience} />
          ))}
    </ol>
  );
}
