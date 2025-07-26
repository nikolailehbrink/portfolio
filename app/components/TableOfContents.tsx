import { cn } from "@/lib/utils";
import type { Toc, TocEntry } from "@stefanprobst/rehype-extract-toc";

export default function TableOfContents({
  outline,
  maxDepth,
  className,
  ...props
}: {
  outline: Toc;
  maxDepth: number;
} & React.ComponentProps<"nav">) {
  return (
    <nav
      className={cn(
        `rounded-xl border bg-neutral-900 bg-linear-to-b p-6 pb-4 shadow-xl
        offset-border`,
        className,
      )}
      {...props}
    >
      <h2 className="mb-2 text-xl font-bold">Table of Contents</h2>
      <ol
        className="prose prose-neutral dark:prose-invert prose-a:block
          prose-a:text-sm prose-a:leading-snug prose-a:text-muted-foreground
          prose-a:no-underline prose-a:hover:text-foreground
          prose-a:hover:decoration-sky-500 prose-ol:my-2 prose-ol:list-none
          prose-ol:pl-4 prose-li:my-2 prose-li:px-0"
      >
        {outline.map((entry) => (
          <TocItem key={entry.value} maxDepth={maxDepth} {...entry} />
        ))}
      </ol>
    </nav>
  );
}

function TocItem({
  depth,
  value,
  id,
  children,
  maxDepth,
}: TocEntry & { maxDepth: number }) {
  if (depth > maxDepth) return null;

  return (
    <li>
      <a href={`#${id}`}>{value}</a>
      {children && children.length > 0 && (
        <ol>
          {children.map((entry) => (
            <TocItem key={entry.value} maxDepth={maxDepth} {...entry} />
          ))}
        </ol>
      )}
    </li>
  );
}
