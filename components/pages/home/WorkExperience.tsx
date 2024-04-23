import Tag from "@/components/shared/Tag";
import { client } from "@/sanity/lib/client";
import type { ExperiencePayload } from "@/types/sanity";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

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
    <li
      className="prose prose-neutral -ml-6 flex gap-4 dark:prose-invert lg:gap-8"
    >
      <div className="sticky top-4 h-12 w-12 lg:top-24">
        <div
          className="background-fill absolute -inset-2 rounded-full
            bg-neutral-950"
        ></div>
        <div
          className="company-logo relative flex h-12 w-12 shrink-0
            justify-center rounded-full border-2 border-transparent
            bg-neutral-800 p-3"
        >
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
      </div>
      <div className="content mt-[5.5px] flex flex-col items-start gap-3">
        <Tag className="bg-neutral-900 text-neutral-400">{formattedPeriod}</Tag>
        <hgroup>
          <h2 className="my-0 text-2xl font-bold">{title}</h2>
          <a href={company?.url} target="_blank" rel="noopener noreferrer">
            {company?.name}
          </a>
        </hgroup>
        <p className="my-0">{description}</p>
      </div>
    </li>
  );
}
