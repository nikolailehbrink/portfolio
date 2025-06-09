import { twMerge } from "tailwind-merge";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTag = `h${HeadingLevel}`;

// Get HTML attributes for all heading elements (h1-h6)
type Props = {
  level: HeadingLevel;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLHeadingElement>, "as">;

export default function LinkedHeading({
  level,
  children,
  className,
  id,
  ...props
}: Props) {
  const HeadingTag = `h${level}` as HeadingTag;

  return (
    <HeadingTag
      id={id}
      className={twMerge("group relative text-balance", className)}
      tabIndex={-1}
      {...props}
    >
      {id && (
        // Normal <a> tag is used in order for :target to work, see https://github.com/remix-run/remix/issues/6432
        <a
          href={`#${id}`}
          className="px-1 no-underline transition-opacity select-none
            group-target:opacity-100 focus:opacity-100 max-sm:hidden sm:absolute
            sm:-translate-x-full sm:opacity-0 sm:group-hover:opacity-100"
          aria-label={`Permalink to ${typeof children === "string" ? children : "this heading"}`}
        >
          #
        </a>
      )}
      {children}
    </HeadingTag>
  );
}
