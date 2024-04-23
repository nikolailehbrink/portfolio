import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div
      className="container mx-auto mb-2 flex flex-1 flex-col max-lg:mt-4 sm:mb-4
        sm:items-center"
    >
      <Skeleton className="mb-6 h-12 w-56 rounded-full" />
      <Skeleton
        className="mx-auto flex w-full max-w-screen-lg flex-1 flex-col
          sm:rounded-lg sm:p-4 sm:pr-0"
      />
    </div>
  );
}
