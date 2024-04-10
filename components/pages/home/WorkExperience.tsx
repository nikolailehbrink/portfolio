import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";

import { client } from "@/sanity/lib/client";
import { ExperiencePayload } from "@/types";

export default function WorkExperience({
  experience,
}: {
  experience: ExperiencePayload;
}) {
  const { company, description, duration, title } = experience;

  const startDate = duration?.start ? new Date(duration?.start) : undefined;
  const endDate = duration?.end ? new Date(duration?.end) : new Date();
  const jobPeriod = [startDate, endDate];

  const options = { year: "numeric", month: "long" } as const;
  const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);

  const formattedPeriod = jobPeriod
    .filter(Boolean)
    .map((date) => dateTimeFormat.format(date))
    .join(" – ");

  const image = useNextSanityImage(client, company?.logo ?? {}, {
    imageBuilder: (image) => image.format("webp").width(64).fit("min"),
  });

  const { src, height, width } = image || {};

  return (
    <li className="-ml-6 flex gap-4 lg:gap-8">
      <div className="sticky top-4 flex h-12 w-12 shrink-0 justify-center rounded-full border-2 border-transparent bg-blue-500 p-3 shadow-[0_0_0_8px] shadow-neutral-950 lg:top-24">
        {src && (
          <Image
            className="w-12 object-contain -hue-rotate-[50deg]"
            src={src}
            alt={`Logo of ${company?.name}`}
            height={height}
            width={width}
          />
        )}
      </div>
      <div className="mt-[5.5px] flex flex-col items-start gap-3 content">
        <span className="rounded-full bg-blue px-3 py-2 text-sm">
          {formattedPeriod}
        </span>

        <hgroup>
          <h2 className="text-2xl font-bold">{title}</h2>
          <a
            className="text-muted-foreground border-b border-muted-foreground hover:border-primary"
            href={company?.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {company?.name}
          </a>
        </hgroup>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </li>
  );
}
