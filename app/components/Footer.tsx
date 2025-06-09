import { cn } from "@/lib/utils";
import { href, Link } from "react-router";
import { SOCIAL_MEDIA_PROFILES } from "@/data/socialProfiles";
import { track } from "@vercel/analytics/react";
import { LEGAL_SITES } from "@/data/legalSites";

export default function Footer({
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return (
    <footer
      className={cn(
        "relative border-1 border-neutral-800 bg-neutral-900 p-3 text-sm md:p-2",
        className,
      )}
      {...props}
    >
      <div
        className="relative container flex flex-wrap items-center
          justify-between gap-3 max-sm:flex-col"
      >
        <p className="grow max-sm:order-2">
          <span className="text-muted-foreground">
            Copyright © {new Date().getFullYear()}
          </span>
          <span className="text-muted-foreground"> - </span>
          Nikolai Lehbrink
        </p>
        <nav
          className="rounded-full border border-neutral-700 bg-neutral-800 px-2
            py-1.5"
        >
          <menu className="flex gap-2">
            {SOCIAL_MEDIA_PROFILES.map(({ href, name, logo: Logo }) => (
              <Link
                key={href}
                to={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="text-muted-foreground hover:text-foreground"
                onClick={() =>
                  track("footer-social-link", {
                    name,
                  })
                }
              >
                <span className="sr-only">Link to {name} profile</span>
                <Logo size={20} weight="duotone" />
              </Link>
            ))}
          </menu>
        </nav>
        <nav className="flex grow justify-end">
          <menu className="flex gap-2">
            {LEGAL_SITES.map(({ href: link, name }) => (
              <Link
                key={link}
                to={href(link)}
                className="text-muted-foreground hover:text-foreground"
              >
                {name}
              </Link>
            ))}
          </menu>
        </nav>
      </div>
    </footer>
  );
}
