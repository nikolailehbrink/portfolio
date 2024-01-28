import { twConfig } from "@/lib/utils";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";

const size = twConfig.theme.spacing[6];

export const socialNavigation = [
  {
    link: "https://github.com/nikolailehbrink",
    platform: "GitHub",
    icon: <GithubLogo weight="duotone" size={size} />,
  },
  {
    link: "https://www.linkedin.com/in/nikolailehbrink/",
    platform: "LinkedIn",
    icon: <LinkedinLogo weight="duotone" size={size} />,
  },
];
