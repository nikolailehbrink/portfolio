import { CarouselItem } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectCarouselSkeleton() {
  return Array.from(Array(4)).map((_, index) => (
    <CarouselItem
      key={index}
      className="carousel-item flex w-full basis-full flex-col gap-2 sm:basis-1/2 xl:basis-1/4"
    >
      <Skeleton className="aspect-square" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-5/6" />
    </CarouselItem>
  ));
}
