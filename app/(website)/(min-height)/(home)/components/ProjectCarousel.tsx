import type { ReactNode } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ProjectCarousel({ children }: { children: ReactNode }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      id="project-carousel"
      className="relative mx-auto w-full max-w-[1920px] space-y-4 px-4 max-xl:container xl:px-8"
    >
      <CarouselContent>{children}</CarouselContent>
      <div className="flex gap-x-[2px] sm:justify-center">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
