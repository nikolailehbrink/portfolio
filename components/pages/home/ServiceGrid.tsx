import { urlForImage } from "@/sanity/lib/utils";
import type { ServicePayload } from "@/types/sanity";
import Image from "next/image";

export default function ServiceGrid({
  services,
}: {
  services: ServicePayload[];
}) {
  return (
    <div className="@container">
      <div className="grid gap-4 @xl:grid-cols-2">
        {services.map((service) => (
          <Service key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
}

function Service({ service }: { service: ServicePayload }) {
  const image = service.image;
  const imageUrl = image && urlForImage(image)?.size(60, 60).fit("crop").url();
  return (
    <div
      className="service-box row-span-4 rounded-lg border-2 border-border
        bg-neutral-900 p-4 @xl:lg:first:col-start-2"
    >
      <div className="mb-2 inline-flex rounded-lg bg-neutral-800 p-1">
        {imageUrl && (
          <Image
            className="w-12 contrast-[1.1] hue-rotate-[318deg] saturate-[1.4]"
            src={imageUrl}
            alt={"Service icon"}
            height={60}
            width={60}
          />
        )}
      </div>
      <h2 className="mb-2 text-xl font-bold leading-tight">{service.title}</h2>
      <p className="line-clamp-[7] text-muted-foreground">
        {service.description}
      </p>
    </div>
  );
}
