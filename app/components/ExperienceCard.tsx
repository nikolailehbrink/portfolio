import type { WorkExperience } from "@/data/workExperience";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

const DATE_TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
};

export default function ExperienceCard({
  title,
  description,
  startDate,
  endDate,
  organization,
  logo,
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
        to={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Company Logo"
        className="relative h-fit shrink-0 rounded-full border bg-neutral-800
          p-1"
      >
        <img
          className="absolute inset-0 size-full rounded-full blur-2xl"
          {...logo}
          loading="lazy"
          alt={organization}
        />
        <img
          className="relative size-10 rounded-full"
          {...logo}
          loading="lazy"
          alt={organization}
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
