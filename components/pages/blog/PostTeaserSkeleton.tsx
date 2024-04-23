import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function PostTeaserSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("@container", className)}>
      <div
        className="relative grid grid-cols-1 items-center gap-4 @4xl:grid-cols-2
          @4xl:gap-8"
      >
        <div className="relative overflow-hidden rounded-lg">
          <Skeleton className="aspect-video w-full" />
          <div
            className="absolute inset-0 top-1/2 bg-gradient-to-t
              from-neutral-950 to-transparent"
          ></div>
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full"></Skeleton>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-4">
          <div className="flex gap-2 text-sm text-neutral-400">
            <Skeleton className="h-4 w-14"></Skeleton>
            <Skeleton className="h-4 w-14"></Skeleton>
            <Skeleton className="h-4 w-14"></Skeleton>
          </div>
          <div className="w-full space-y-2">
            <Skeleton className="h-7 w-1/2"></Skeleton>
            <Skeleton className="h-7 w-2/3"></Skeleton>
          </div>
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="hidden w-full items-center gap-2 @4xl:flex">
            <Skeleton className="h-10 w-10 flex-shrink-0 rounded-full" />
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-40"></Skeleton>
              <Skeleton className="h-4 w-48"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
