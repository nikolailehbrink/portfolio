import { Link } from "react-router";
import {
  GithubLogo,
  LinkedinLogo,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";

const SOCIAL_MEDIA_PLATFORMS = {
  GitHub: {
    profileUrl: "https://github.com",
    logo: GithubLogo,
  },
  X: {
    profileUrl: "https://x.com",
    logo: XLogo,
  },
  LinkedIn: {
    profileUrl: "https://linkedin.com/in/",
    logo: LinkedinLogo,
  },
  YouTube: {
    profileUrl: "https://www.youtube.com/@",
    logo: YoutubeLogo,
  },
} as const;

export default function ProfileBadge({
  platform,
  handle,
  children,
}: {
  platform: keyof typeof SOCIAL_MEDIA_PLATFORMS;
  handle: string;
  children: React.ReactNode;
}) {
  const { profileUrl, logo: Logo } = SOCIAL_MEDIA_PLATFORMS[platform];
  return (
    <Link
      to={`${profileUrl}/${handle}`}
      target="_blank"
      className="inline-flex items-center gap-1 rounded-md border
        border-neutral-800 bg-neutral-900 px-1.5 py-0.5 align-bottom text-sm
        no-underline hover:border-neutral-700 hover:bg-neutral-800"
      rel="noreferrer"
    >
      <Logo size={20} weight="duotone" />
      {children}
    </Link>
  );
}
