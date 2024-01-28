import footerNavigation from "@/data/Home/FooterNavigation";
import { Code } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { twConfig } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 py-4" role="contentinfo">
      <div className="container flex justify-between max-lg:flex-col">
        <span>
          &copy; {new Date().getFullYear()} | Nikolai Lehbrink - Conception,
          Design and Development
        </span>
        <menu className="flex gap-2">
          <li>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    target="_blank"
                    href={"https://github.com/nikolailehbrink/website"}
                  >
                    <Code
                      className="inline"
                      size={twConfig.theme.spacing[6]}
                      weight="duotone"
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Source Code</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <span className="ml-2">|</span>
          </li>
          {footerNavigation.length > 0 &&
            footerNavigation.map((item, index) => (
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
      </div>
    </footer>
  );
}
