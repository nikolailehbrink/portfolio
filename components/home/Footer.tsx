import footerNavigation from "@/data/Home/FooterNavigation";
import CodeBranch from "@/public/icons/code-branch.svg";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 py-4" role="contentinfo">
      <div className="container flex justify-between max-lg:flex-col">
        <span>
          &copy; {new Date().getFullYear()} | Nikolai Lehbrink - Conception,
          Design and Development
        </span>
        <menu className="flex gap-2">
          <li className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    target="_blank"
                    href={"https://github.com/nikolailehbrink/website"}
                  >
                    <CodeBranch className="w-6" />
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
