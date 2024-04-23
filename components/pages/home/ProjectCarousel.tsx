import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { ShowcaseProject } from "@/types/sanity";
import ProjectCarouselItem from "./ProjectCarouselItem";

export default function ProjectCarousel({
  projects,
}: {
  projects: ShowcaseProject[];
}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      id="project-carousel"
      className="relative mx-auto w-full max-w-[1920px] space-y-4 px-4
        max-xl:container xl:px-8"
    >
      <CarouselContent>
        {projects.map((project, key) => (
          <ProjectCarouselItem key={key} project={project} />
        ))}
      </CarouselContent>
      <div className="flex gap-x-[2px] sm:justify-center">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
