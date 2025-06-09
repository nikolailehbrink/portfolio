import { NAVIGATION_LINKS } from "@/data/navigationItems";
import { cn } from "@/lib/utils";
import { href, NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 container flex justify-center
        bg-gradient-to-b from-background to-transparent p-4"
    >
      <menu
        className="flex items-center gap-1 rounded-xl border border-muted
          bg-background/75 p-1 shadow-lg backdrop-blur-xl"
      >
        {NAVIGATION_LINKS.map(({ path, name, icon: Icon }) => (
          <NavLink
            key={path}
            to={href(path)}
            prefetch="intent"
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
          >
            {({ isActive }) => (
              <>
                <Icon className="size-6 sm:size-5" weight="duotone" />
                <span
                  className={!isActive ? "max-sm:sr-only max-sm:hidden" : ""}
                >
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
