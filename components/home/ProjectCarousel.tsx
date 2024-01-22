import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import type { SanityDocument } from "next-sanity";
import { loadQuery } from "@/sanity/lib/store";
import { dataset, projectId } from "@/sanity/env";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder({ projectId, dataset });

export default async function ProjectCarousel() {
  const { data: projects } = await loadQuery<SanityDocument[]>(PROJECTS_QUERY);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="relative mx-auto max-w-[1920px] space-y-4 px-4 max-xl:container xl:px-8"
    >
      <CarouselContent>
        {projects.map((project) => (
          <CarouselItem
            key={project._id}
            className="flex basis-full flex-col gap-2 sm:basis-1/2 xl:basis-1/4"
          >
            <div className="relative overflow-hidden rounded-lg">
              <Image
                className="transition-all duration-500 hover:rotate-3 hover:scale-110"
                src={builder
                  .image(project.image)
                  .width(1000)
                  .height(1000)
                  .quality(80)
                  .url()}
                alt={project.image.alt}
                width={1000}
                height={1000}
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">{project.title}</h2>
              <p className=" line-clamp-2">{project.description}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex gap-x-[2px] sm:justify-center">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
