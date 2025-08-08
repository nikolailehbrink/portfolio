import { Link } from "react-router";

import type { WorkExperience } from "@/data/workExperience";

import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const DATE_TIME_FORMAT_OPTIONS = {
  month: "long",
  year: "numeric",
} satisfies Intl.DateTimeFormatOptions;

export default function ExperienceCard({
  description,
  endDate,
  logo,
  organization,
  startDate,
  title,
  url,
}: WorkExperience) {
  const formattedStartDate = formatDate(startDate, DATE_TIME_FORMAT_OPTIONS);
  const formattedEndDate =
    endDate !== null
      ? formatDate(endDate, DATE_TIME_FORMAT_OPTIONS)
      : "Present";
  return (
    <div
      className="flex items-start gap-2 overflow-clip rounded-xl border
        bg-neutral-900 p-4 offset-border transition-colors"
    >
      <Link
        aria-label="Company Logo"
        className="relative h-fit shrink-0 rounded-full border bg-neutral-800
          p-1"
        rel="noopener noreferrer"
        target="_blank"
        to={url}
      >
        <img
          className="absolute inset-0 size-full rounded-full blur-2xl"
          {...logo}
          alt={organization}
          loading="lazy"
        />
        <img
          className="relative size-10 rounded-full"
          {...logo}
          alt={organization}
          loading="lazy"
        />
        <span className="sr-only">Link to {url}</span>
      </Link>

      <div className="flex grow flex-col gap-0.5">
        <div
          className="flex flex-wrap-reverse items-center justify-between gap-1"
        >
          <h3 className="font-bold">{title}</h3>
          <p
            className={cn(
              "text-xs text-muted-foreground",
              !endDate && "text-sky-400",
            )}
          >
            {formattedStartDate} - {formattedEndDate}
          </p>
        </div>
        <p className="text-sm text-muted-foreground" title={description}>
          {description}
        </p>
      </div>
    </div>
  );
}
