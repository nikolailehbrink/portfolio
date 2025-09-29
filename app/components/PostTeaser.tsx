import type { Post } from "@/lib/posts.server";
import { CalendarDotsIcon } from "@phosphor-icons/react/dist/ssr/CalendarDots";
import { ClockCountdownIcon } from "@phosphor-icons/react/dist/ssr/ClockCountdown";
import { PencilIcon } from "@phosphor-icons/react/dist/ssr/Pencil";
import { Link } from "react-router";
import { Badge } from "./ui/badge";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const DATE_TIME_FORMAT_OPTIONS = {
  year: "numeric",
  day: "2-digit",
  month: "short",
} satisfies Intl.DateTimeFormatOptions;

export default function PostTeaser({
  slug,
  metadata,
  isDraft,
  className,
  ...props
}: Post & React.ComponentProps<"li">) {
  const { publicationDate, readingTime, title, description } = metadata;

  const formattedPublicationDate = formatDate(
    publicationDate,
    DATE_TIME_FORMAT_OPTIONS,
  );

  return (
    <li
      className={cn(
        `group relative flex flex-col rounded-lg border bg-neutral-900
        offset-border transition-colors hover:bg-neutral-800`,
        className,
      )}
      {...props}
    >
      <Link className="absolute inset-0 z-20" to={slug} prefetch="intent">
        <span className="sr-only">Link to article</span>
      </Link>
      <div
        className="z-10 flex flex-col gap-3 rounded-lg border-neutral-700 p-4
          hover:bg-neutral-800"
      >
        <div className="flex gap-2 text-xs text-muted-foreground">
          {isDraft && (
            <Badge className="dark:bg-orange-500/20 dark:text-orange-400">
              <PencilIcon size={16} weight="duotone" />
              Draft
            </Badge>
          )}
          <Badge className="dark:bg-sky-500/20 dark:text-sky-400" asChild>
            <time dateTime={publicationDate.toISOString()}>
              <CalendarDotsIcon size={16} weight="duotone" />
              {formattedPublicationDate}
            </time>
          </Badge>
          {readingTime && (
            <Badge variant="secondary" className="group-hover:bg-neutral-700">
              <ClockCountdownIcon size={16} weight="duotone" />
              {readingTime} min read
            </Badge>
          )}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </li>
  );
}
