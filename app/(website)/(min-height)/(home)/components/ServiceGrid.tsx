import { urlFor } from "@/sanity/lib/image";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import { loadQuery } from "@/sanity/lib/store";
import type { SanityService } from "@/types/sanity/sanityService";
import Image from "next/image";
import ServiceSkeleton from "./ServiceSkeleton";

export default async function ServiceGrid() {
  const { data: services } = await loadQuery<SanityService[]>(SERVICES_QUERY);

  if (!services) {
    return <ServiceSkeleton />;
  }

  return (
    <div className="@container">
      <div className="grid gap-4 @xl:grid-cols-2">
        {services.map((service) => (
          <div
            key={service._id}
            className="service-box row-span-4 rounded-lg border-2 bg-neutral-900 p-4 @xl:lg:first:col-start-2"
          >
            <div className="mb-2 inline-flex rounded-lg bg-neutral-800 p-1 text-white">
              <Image
                className="w-12 contrast-[1.1] hue-rotate-[318deg] saturate-[1.4]"
                src={urlFor(service.image).size(60, 60).quality(100).url()}
                alt={service.image.alt || "Service icon"}
                height={60}
                width={60}
              />
            </div>
            <h2 className="mb-2 text-xl font-bold leading-tight">
              {service.title}
            </h2>
            <p className="line-clamp-[7]">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
