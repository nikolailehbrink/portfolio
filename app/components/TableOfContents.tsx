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
    <nav className={cn("p-6 pb-4", className)} {...props}>
      <p className="mb-2 text-2xl font-bold text-foreground sm:text-xl">
        Table of Contents
      </p>
      <ol
        className="prose prose-neutral dark:prose-invert prose-a:block
          prose-a:leading-snug prose-a:text-muted-foreground
          prose-a:no-underline prose-a:hover:text-foreground
          prose-a:hover:decoration-sky-500 sm:prose-a:text-sm prose-ol:my-2
          prose-ol:list-none prose-ol:pl-6 prose-li:my-2 prose-li:px-0"
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
      {/* {/* Using <Link /> here causes unexpected behavior when rendered inside a drawer.
    For now, <a> is used to avoid navigation issues and UI glitches.*/}
      {/* TODO: Replace the history instead of pushing to it the whole time */}

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
