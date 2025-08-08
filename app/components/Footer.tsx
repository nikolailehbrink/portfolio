import { track } from "@vercel/analytics/react";
import { href, Link } from "react-router";

import { LEGAL_SITES } from "@/data/legalSites";
import { SOCIAL_MEDIA_PROFILES } from "@/data/socialProfiles";
import { cn } from "@/lib/utils";

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
            {SOCIAL_MEDIA_PROFILES.map(({ href, logo: Logo, name }) => (
              <Link
                aria-label={name}
                className="text-muted-foreground hover:text-foreground"
                key={href}
                onClick={() =>
                  track("footer-social-link", {
                    name,
                  })
                }
                rel="noreferrer"
                target="_blank"
                to={href}
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
                className="text-muted-foreground hover:text-foreground"
                key={link}
                to={href(link)}
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
