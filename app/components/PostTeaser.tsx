import {
  CalendarDotsIcon,
  ClockCountdownIcon,
  PencilIcon,
} from "@phosphor-icons/react";
import { Link } from "react-router";

import type { Post } from "@/lib/posts.server";

import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

import { Badge } from "./ui/badge";

const DATE_TIME_FORMAT_OPTIONS = {
  day: "2-digit",
  month: "short",
  year: "numeric",
} satisfies Intl.DateTimeFormatOptions;

export default function PostTeaser({
  className,
  isDraft,
  metadata,
  slug,
  ...props
}: Post & React.ComponentProps<"li">) {
  const { description, publicationDate, readingTime, title } = metadata;

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
      <Link className="absolute inset-0 z-20" prefetch="intent" to={slug}>
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
          <Badge asChild className="dark:bg-sky-500/20 dark:text-sky-400">
            <time dateTime={publicationDate.toISOString()}>
              <CalendarDotsIcon size={16} weight="duotone" />
              {formattedPublicationDate}
            </time>
          </Badge>
          {readingTime && (
            <Badge className="group-hover:bg-neutral-700" variant="secondary">
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
