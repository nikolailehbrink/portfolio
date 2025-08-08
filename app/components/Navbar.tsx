import { href, NavLink } from "react-router";

import { NAVIGATION_LINKS } from "@/data/navigationItems";
import { cn } from "@/lib/utils";

export default function Navbar({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      className={cn(
        `sticky top-0 z-50 container flex justify-center bg-linear-to-b
        from-background to-transparent p-4`,
        className,
      )}
      {...props}
    >
      <menu
        className="flex items-center gap-1 rounded-xl border border-muted
          bg-background/75 p-1 shadow-lg backdrop-blur-xl"
      >
        {NAVIGATION_LINKS.map(({ icon: Icon, name, path }) => (
          <NavLink
            className={({ isActive }) =>
              cn(
                `flex gap-1 rounded-lg border px-3 py-1 transition-colors
                active:inset-shadow-xs sm:text-sm`,
                isActive
                  ? "border-neutral-700 bg-neutral-800 text-neutral-200"
                  : `border-muted bg-neutral-900 text-muted-foreground
                    hover:border-neutral-700 hover:bg-neutral-800 max-sm:px-2`,
              )
            }
            key={path}
            prefetch="intent"
            to={href(path)}
          >
            {({ isActive }) => (
              <>
                <Icon className="size-6 sm:size-5" weight="duotone" />
                <span className={!isActive ? "max-sm:sr-only" : ""}>
                  {name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </menu>
    </nav>
  );
}
