import Link from "next/link";

import CodeBranch from "@/assets/icons/unicons/code-branch.svg";
import GitHub from "@/assets/icons/unicons/github.svg";
import LinkedIn from "@/assets/icons/unicons/linkedin.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { tailwindConfig } from "@/tailwind.config";

const size = tailwindConfig.theme.spacing[6];

const navigationItems = [
  { name: "Privacy Policy", link: "/privacy-policy" },
  { name: "Legal Notice", link: "/legal-notice" },
];

const socials = [
  {
    link: "https://github.com/nikolailehbrink/portfolio",
    label: "Source Code",
    icon: <CodeBranch width={size} />,
  },
  {
    link: "https://github.com/nikolailehbrink",
    label: "GitHub",
    icon: <GitHub width={size} />,
  },
  {
    link: "https://www.linkedin.com/in/nikolailehbrink/",
    label: "LinkedIn",
    icon: <LinkedIn width={size} />,
  },
];

export function Footer() {
  return (
    <footer className="bg-neutral-950 py-2" role="contentinfo">
      <div className="container flex justify-between gap-2 max-md:flex-col md:items-center">
        <span>&copy; {new Date().getFullYear()} | Nikolai Lehbrink</span>
        <div className="flex flex-wrap items-center gap-2 max-sm:justify-between sm:gap-4">
          <nav>
            <menu className="flex gap-2 rounded-full border-2 bg-neutral-900 px-3 py-1">
              {socials.map(({ link, icon, label }) => (
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

          <nav>
            <menu className="flex gap-2">
              {navigationItems.map((item, index) => (
                <li key={item.link}>
                  <Link
                    className="hover:underline hover:underline-offset-2"
                    href={item.link}
                  >
                    {item.name}
                  </Link>
                  {index < navigationItems.length - 1 && (
                    <span className="ml-2">|</span>
                  )}
                </li>
              ))}
            </menu>
          </nav>
        </div>
      </div>
    </footer>
  );
}
