import { twMerge } from "tailwind-merge";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTag = `h${HeadingLevel}`;

// Get HTML attributes for all heading elements (h1-h6)
type Props = Omit<React.HTMLAttributes<HTMLHeadingElement>, "as"> & {
  children: React.ReactNode;
  level: HeadingLevel;
};

export default function LinkedHeading({
  children,
  className,
  id,
  level,
  ...props
}: Props) {
  const HeadingTag = `h${level}` as HeadingTag;

  return (
    <HeadingTag
      className={twMerge("group relative text-balance", className)}
      id={id}
      tabIndex={-1}
      {...props}
    >
      {id && (
        // Normal <a> tag is used in order for :target to work, see https://github.com/remix-run/remix/issues/6432
        <a
          aria-label={`Permalink to ${typeof children === "string" ? children : "this heading"}`}
          className="px-1 no-underline transition-opacity select-none
            group-target:opacity-100 focus:opacity-100 max-sm:hidden sm:absolute
            sm:-translate-x-full sm:opacity-0 sm:group-hover:opacity-100"
          href={`#${id}`}
        >
          #
        </a>
      )}
      {children}
    </HeadingTag>
  );
}
