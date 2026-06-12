import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { EnvelopeIcon } from "@phosphor-icons/react/dist/ssr/Envelope";
import { useState } from "react";
import NewsletterForm from "./NewsletterForm";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "shortest", label: "Shortest read" },
  { value: "longest", label: "Longest read" },
] as const;

type SortOption = (typeof SORT_OPTIONS)[number]["value"];

function getPostItems() {
  return Array.from(
    document.querySelectorAll<HTMLElement>("#blog-list [data-search]"),
  );
}

export default function BlogToolbar({
  tags,
  activeTagSlug,
  className,
}: {
  tags: Array<{ name: string; slug: string }>;
  activeTagSlug?: string;
  className?: string;
}) {
  const [sort, setSort] = useState<SortOption>("newest");

  const topicItems = [
    { value: "all", label: "All topics" },
    ...tags.map(({ name, slug }) => ({ value: slug, label: name })),
  ];

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const terms = event.target.value
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    let visibleCount = 0;

    for (const item of getPostItems()) {
      const haystack = item.dataset.search ?? "";
      const isMatch = terms.every((term) => haystack.includes(term));
      item.classList.toggle("hidden", !isMatch);
      if (isMatch) {
        visibleCount++;
      }
    }

    // Only surface the empty state while actively searching.
    document
      .getElementById("blog-search-empty")
      ?.classList.toggle("hidden", terms.length === 0 || visibleCount > 0);
  }

  function handleSortChange(value: SortOption) {
    setSort(value);
    const list = document.getElementById("blog-list");
    if (!list) {
      return;
    }
    const date = (item: HTMLElement) => Number(item.dataset.publicationDate);
    const readingTime = (item: HTMLElement) => Number(item.dataset.readingTime);
    const compare: Record<
      SortOption,
      (a: HTMLElement, b: HTMLElement) => number
    > = {
      newest: (a, b) => date(b) - date(a),
      oldest: (a, b) => date(a) - date(b),
      shortest: (a, b) => readingTime(a) - readingTime(b),
      longest: (a, b) => readingTime(b) - readingTime(a),
    };
    for (const item of getPostItems().sort(compare[value])) {
      list.appendChild(item);
    }
  }

  function handleTagChange(slug: string) {
    window.location.assign(slug === "all" ? "/blog" : `/blog?tag=${slug}`);
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <div className="relative min-w-44 flex-1">
        <MagnifyingGlassIcon
          size={16}
          weight="duotone"
          className="pointer-events-none absolute top-1/2 left-2.5
            -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          autoComplete="off"
          placeholder="Search posts..."
          aria-label="Search blog posts"
          onChange={handleSearch}
          className="bg-card pl-8 dark:bg-card"
        />
      </div>
      <Select
        items={topicItems}
        value={activeTagSlug ?? "all"}
        onValueChange={(value) => {
          if (value !== null) {
            handleTagChange(value);
          }
        }}
      >
        <SelectTrigger
          className="bg-card dark:bg-card"
          aria-label="Filter posts by topic"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {topicItems.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        items={SORT_OPTIONS}
        value={sort}
        onValueChange={(value) => handleSortChange(value as SortOption)}
      >
        <SelectTrigger className="bg-card dark:bg-card" aria-label="Sort posts">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {SORT_OPTIONS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Popover>
        <PopoverTrigger
          render={<Button variant="outline" className="bg-card dark:bg-card" />}
        >
          <EnvelopeIcon data-icon="inline-start" weight="duotone" />
          Subscribe
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-96 max-w-[calc(100vw-1rem)] p-4"
        >
          <PopoverHeader>
            <PopoverTitle>Join the newsletter</PopoverTitle>
            <PopoverDescription>
              New posts straight to your inbox. No spam, unsubscribe anytime.
            </PopoverDescription>
          </PopoverHeader>
          <NewsletterForm showText={false} showCard={false} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
