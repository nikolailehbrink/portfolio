import footerNavigation from "@/data/Home/FooterNavigation";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { socialNavigation } from "@/data/Home/SocialNavigation";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 py-2" role="contentinfo">
      <div className="container flex justify-between gap-2 max-md:flex-col md:items-center">
        <span>&copy; {new Date().getFullYear()} | Nikolai Lehbrink</span>
        <div className="flex items-center gap-2 max-sm:justify-between sm:gap-4">
          {socialNavigation.length > 0 && (
            <nav>
              <menu className="flex gap-2 rounded-full border-2 bg-neutral-900 px-3 py-1">
                {socialNavigation.map(({ link, icon, label }) => (
                  <li key={link} className="flex items-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            aria-label={`Link to ${label}`}
                            target="_blank"
                            href={link}
                          >
                            {icon}
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{label}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </li>
                ))}
              </menu>
            </nav>
          )}

          {footerNavigation.length > 0 && (
            <nav>
              <menu className="flex gap-2">
                {footerNavigation.map((item, index) => (
                  <li key={item.link}>
                    <Link
                      className="hover:underline hover:underline-offset-2"
                      href={item.link}
                    >
                      {item.name}
                    </Link>
                    {index < footerNavigation.length - 1 && (
                      <span className="ml-2">|</span>
                    )}
                  </li>
                ))}
              </menu>
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}
