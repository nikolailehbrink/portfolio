import Image from "next/image";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/lib/store";
import ExternalLink from "@/assets/icons/unicons/external-link.svg";
import { urlFor } from "@/sanity/lib/image";
import type { SanityProject } from "@/types/sanity/sanityProject";
import { CarouselItem } from "@/components/ui/carousel";

export default async function ProjectCarouselItems() {
  const { data: projects } = await loadQuery<SanityProject[]>(PROJECTS_QUERY);

  return projects.map((project) => (
    <CarouselItem
      key={project._id}
      className="carousel-item flex basis-full flex-col gap-2 sm:basis-1/2 xl:basis-1/4"
    >
      <div className="relative overflow-hidden rounded-lg">
        <Image
          className="transition-all duration-500 hover:rotate-3 hover:scale-110"
          src={urlFor(project.image).width(1000).height(1000).quality(80).url()}
          alt={project.image.alt || "Project image"}
          width={1000}
          height={1000}
        />
      </div>
      <div>
        <h2 className="text-xl font-bold">
          {project.link ? (
            <a
              href={project.link}
              className="inline-flex items-center gap-1 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.title}
              <ExternalLink className="w-5" />
            </a>
          ) : (
            project.title
          )}
        </h2>
        <p className="line-clamp-2">{project.description}</p>
      </div>
    </CarouselItem>
  ));
}
