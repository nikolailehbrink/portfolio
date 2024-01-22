import Archive from "@/public/icons/archive.svg";
import ProjectCarousel from "./ProjectCarousel";

export default function ProjectSection() {
  return (
    <section
      id="projects"
      className="flex flex-col justify-center gap-6 lg:gap-12"
    >
      <div className="container flex flex-col items-start gap-4 lg:items-center">
        <div className="badge badge-blue">
          <Archive className="w-6" />
          Projekte
        </div>
        <h2 className="text-5xl font-bold">Behind the Screens</h2>
        <p className="max-w-prose lg:text-center">
          Schau dir mein Portfolio an! Hier findest du verschiedene Projekte,
          von handgemachten Webseiten bis hin zu frischen Interface-Designs -
          alles Ausdruck meiner Begeisterung für das Digitale.
        </p>
        <p className="max-w-prose lg:text-center">
          Aber nicht nur das, ich designe auch für Printmedien und setze dabei
          immer hohe Maßstäbe an Qualität und Nutzen. Denn ich bin der Meinung:
          Jedes Projekt, egal wie groß, verdient nur das Beste.
        </p>
      </div>
      <ProjectCarousel />
    </section>
  );
}
