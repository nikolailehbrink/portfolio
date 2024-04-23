import ExternalLink from "@/assets/icons/unicons/external-link.svg";
import { CustomPortableText } from "@/components/shared/CustomPortableText";
import { CarouselItem } from "@/components/ui/carousel";
import { urlForImage } from "@/sanity/lib/utils";
import type { ShowcaseProject } from "@/types/sanity";
import Image from "next/image";

export default function ProjectCarouselItem({
  project,
}: {
  project: ShowcaseProject;
}) {
  const image = project.coverImage;
  const imageUrl =
    image && urlForImage(image)?.size(1000, 1000).quality(80).url();

  return (
    <CarouselItem
      className="project-carousel-item flex basis-full flex-col gap-2
        sm:basis-1/2 xl:basis-1/4"
    >
      <div className="relative overflow-hidden rounded-lg">
        {imageUrl && (
          <Image
            className="transition-all duration-500 hover:rotate-3
              hover:scale-110"
            src={imageUrl}
            alt={`Project image for ${project.title}`}
            width={1000}
            height={1000}
          />
        )}
      </div>
      <div>
        <h2 className="text-xl font-bold">
          {project.site ? (
            <a
              href={project.site}
              className="inline-flex items-center gap-1 border-b-2
                border-transparent hover:border-neutral-50"
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
        <div className="line-clamp-2 text-muted-foreground">
          <CustomPortableText value={project.overview ?? []} />
        </div>
      </div>
    </CarouselItem>
  );
}
