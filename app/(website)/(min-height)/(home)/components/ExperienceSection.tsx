import Diary from "@/assets/icons/unicons/diary.svg";
import ExpertiseGrid from "./ExpertiseGrid";
import { Suspense } from "react";
import WorkPlaces from "./WorkPlaces";

export default function ExperienceSection() {
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
        <Suspense fallback={<div>Loading...</div>}>
          <WorkPlaces />
        </Suspense>
      </div>
    </section>
  );
}
