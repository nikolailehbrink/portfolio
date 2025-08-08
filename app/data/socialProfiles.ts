import {
  DribbbleLogo,
  GithubLogo,
  type Icon,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react";

type SocialProfile = {
  href: string;
  logo: Icon;
  name: string;
};

export const SOCIAL_MEDIA_PROFILES = [
  {
    href: "https://github.com/nikolailehbrink",
    logo: GithubLogo,
    name: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/nikolailehbrink/",
    logo: LinkedinLogo,
    name: "LinkedIn",
  },
  {
    href: "https://x.com/nikolailehbrink",
    logo: XLogo,
    name: "X",
  },
  {
    href: "https://dribbble.com/nikolailehbrink",
    logo: DribbbleLogo,
    name: "Dribbble",
  },
] as const satisfies SocialProfile[];
