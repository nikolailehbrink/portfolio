import { twConfig } from "@/lib/utils";
import GitHub from "@/assets/icons/unicons/github.svg";
import LinkedIn from "@/assets/icons/unicons/linkedin.svg";
import CodeBranch from "@/assets/icons/unicons/code-branch.svg";

const size = twConfig.theme.spacing[6];

export const socialNavigation = [
  {
    link: "https://github.com/nikolailehbrink/website",
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
