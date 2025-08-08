import { GithubLogoIcon, LinkSimpleIcon } from "@phosphor-icons/react";
import { Link } from "react-router";

import type { Project } from "@/data/projects";

import { cn } from "@/lib/utils";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function ProjectTeaser({
  className,
  description,
  github,
  image,
  tags,
  title,
  url,
  ...props
}: Project & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `relative row-span-4 flex flex-col justify-start gap-2 overflow-hidden
        rounded-xl bg-neutral-900 p-4 offset-border lg:last:col-start-3
        lg:last:row-start-2`,
        className,
      )}
      {...props}
    >
      <div
        className="absolute top-2 right-2 z-10 flex items-center gap-2 text-xs"
      >
        {tags.map((tag) => (
          <Badge className="bg-sky-950 text-sky-400" key={tag}>
            {tag}
          </Badge>
        ))}
      </div>
      <div className="relative transition-[filter_color] duration-300">
        <div
          className="absolute inset-0 bg-linear-to-b from-transparent
            via-transparent to-neutral-900 to-95%"
        ></div>
        <img
          {...image}
          alt={title}
          className="aspect-[4/3] rounded-lg object-cover"
        />
      </div>

      <div
        className="absolute right-4 bottom-4 left-4 flex items-end
          justify-between gap-4"
      >
        <div className="flex flex-col">
          <h3 className="truncate text-lg font-bold">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        {github || url ? (
          <div className="flex items-center gap-2">
            {url ? (
              <Button asChild>
                <Link rel="noopener noreferrer" target="_blank" to={url}>
                  <LinkSimpleIcon size={20} weight="duotone" />
                  Visit
                </Link>
              </Button>
            ) : null}
            {github ? (
              <Button
                asChild
                className="bg-sky-950 text-sky-400 hover:bg-sky-900"
                size="icon"
                variant="secondary"
              >
                <Link rel="noopener noreferrer" target="_blank" to={github}>
                  <GithubLogoIcon size={20} weight="duotone" />
                  <span className="sr-only">Link to GitHub repository</span>
                </Link>
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
