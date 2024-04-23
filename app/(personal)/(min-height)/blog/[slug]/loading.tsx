import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container my-4 space-y-4">
      <Skeleton className="h-6 w-[100px] rounded-full" />
      <div
        className="mx-auto flex max-w-prose flex-col justify-center gap-6
          sm:items-center"
      >
        <Skeleton className="h-8 w-16 rounded-full" />
        <div className="flex w-full flex-col space-y-4 sm:items-center">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-10/12" />
        </div>
        <div className="flex w-full flex-col space-y-4 sm:items-center">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-10/12" />
        </div>
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="aspect-video w-full"></Skeleton>
      <div className="mx-auto flex max-w-prose flex-col gap-8">
        <div className="space-y-4">
          <Skeleton className="h-4 w-full"></Skeleton>
          <Skeleton className="h-4 w-full"></Skeleton>
          <Skeleton className="h-4 w-full"></Skeleton>
          <Skeleton className="h-4 w-full"></Skeleton>
        </div>
        <Skeleton className="h-10 w-full"></Skeleton>
        <div className="space-y-4">
          <Skeleton className="h-4 w-full"></Skeleton>
          <Skeleton className="h-4 w-full"></Skeleton>
          <Skeleton className="h-4 w-full"></Skeleton>
          <Skeleton className="h-4 w-full"></Skeleton>
          <Skeleton className="h-4 w-full"></Skeleton>
          <Skeleton className="h-4 w-full"></Skeleton>
        </div>
        <Skeleton className="aspect-video w-full"></Skeleton>
      </div>
    </div>
  );
}
