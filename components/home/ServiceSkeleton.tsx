import { Skeleton } from "../ui/skeleton";

export default function ServiceSkeleton() {
  return (
    <div className="@container">
      <div className="grid gap-4 @xl:grid-cols-2">
        {Array.from(Array(4)).map((_, index) => (
          <Skeleton
            key={index}
            className="service-box row-span-4 h-80 rounded-lg @xl:lg:first:col-start-2"
          />
        ))}
      </div>
    </div>
  );
}
