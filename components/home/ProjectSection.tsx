import Archive from "@/assets/icons/unicons/archive.svg";
import ProjectCarousel from "./ProjectCarousel";

export default function ProjectSection() {
  return (
    <section
      id="projects"
      className="flex flex-col justify-center gap-6 lg:gap-12 lg:py-24"
    >
      <div
        id="project-content"
        className="container flex flex-col items-start gap-4 lg:items-center"
      >
        <div className="badge badge-blue">
          <Archive />
          Projects
        </div>
        <h2 className="text-5xl font-bold">Behind the Screen</h2>
        <p className="max-w-prose lg:text-center">
          After my studies and some experience from working as a student in an
          advertising agency, I wanted to be able to take on jobs independently.
          So I filled out all the paperwork and became self-employed relatively
          quickly towards the end of 2021.
        </p>
        <p className="max-w-prose lg:text-center">
          Since then, I&apos;ve worked alongside some interesting people and
          companies, for whom I&apos;ve created the following projects.
        </p>
      </div>
      <ProjectCarousel />
    </section>
  );
}
