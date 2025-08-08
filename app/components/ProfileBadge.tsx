import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";
import { Link } from "react-router";

const SOCIAL_MEDIA_PLATFORMS = {
  GitHub: {
    logo: GithubLogoIcon,
    profileUrl: "https://github.com",
  },
  LinkedIn: {
    logo: LinkedinLogoIcon,
    profileUrl: "https://linkedin.com/in/",
  },
  X: {
    logo: XLogoIcon,
    profileUrl: "https://x.com",
  },
  YouTube: {
    logo: YoutubeLogoIcon,
    profileUrl: "https://www.youtube.com/@",
  },
} as const;

export default function ProfileBadge({
  children,
  handle,
  platform,
}: {
  children: React.ReactNode;
  handle: string;
  platform: keyof typeof SOCIAL_MEDIA_PLATFORMS;
}) {
  const { logo: Logo, profileUrl } = SOCIAL_MEDIA_PLATFORMS[platform];
  return (
    <Link
      className="inline-flex items-center gap-1 rounded-md border
        border-neutral-800 bg-neutral-900 px-1.5 py-0.5 align-bottom text-sm
        no-underline hover:border-neutral-700 hover:bg-neutral-800"
      rel="noreferrer"
      target="_blank"
      to={`${profileUrl}/${handle}`}
    >
      <Logo size={20} weight="duotone" />
      {children}
    </Link>
  );
}
