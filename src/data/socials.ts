import type { Icon } from "@phosphor-icons/react";
import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr/GithubLogo";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr/LinkedinLogo";
import { XLogoIcon } from "@phosphor-icons/react/dist/ssr/XLogo";

type SocialProfile = {
  name: string;
  href: string;
  logo: Icon;
};

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/nikolailehbrink",
    logo: GithubLogoIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/nikolailehbrink/",
    logo: LinkedinLogoIcon,
  },
  {
    name: "X",
    href: "https://x.com/nikolailehbrink",
    logo: XLogoIcon,
  },
] as const satisfies Array<SocialProfile>;
