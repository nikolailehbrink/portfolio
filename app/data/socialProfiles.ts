import {
  DribbbleLogo,
  GithubLogo,
  LinkedinLogo,
  XLogo,
  type Icon,
} from "@phosphor-icons/react";

export const SOCIAL_MEDIA_PROFILES = [
  {
    name: "GitHub",
    href: "https://github.com/nikolailehbrink",
    logo: GithubLogo,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/nikolailehbrink/",
    logo: LinkedinLogo,
  },
  {
    name: "X",
    href: "https://x.com/nikolailehbrink",
    logo: XLogo,
  },
  {
    name: "Dribbble",
    href: "https://dribbble.com/nikolailehbrink",
    logo: DribbbleLogo,
  },
] as const satisfies {
  name: string;
  href: string;
  logo: Icon;
}[];
