import Dribbble from "@/assets/icons/unicons/dribbble.svg";
import ExternalLink from "@/assets/icons/unicons/external-link.svg";
import GitHub from "@/assets/icons/unicons/github.svg";
import InstagramAlt from "@/assets/icons/unicons/instagram-alt.svg";
import LinkedIn from "@/assets/icons/unicons/linkedin.svg";
import Microsoft from "@/assets/icons/unicons/microsoft.svg";
import React from "@/assets/icons/unicons/react.svg";
import RedditAlienAlt from "@/assets/icons/unicons/reddit-alien-alt.svg";
import Twitter from "@/assets/icons/unicons/twitter.svg";
import WordPress from "@/assets/icons/unicons/wordpress.svg";
import YouTube from "@/assets/icons/unicons/youtube.svg";
import type { PortableTextComponentProps } from "@portabletext/react";
import type { PortableTextLink } from "@portabletext/types";
import Link from "next/link";

const sites = [
  {
    hostname: "github.com",
    icon: GitHub,
  },
  {
    hostname: "linkedin.com",
    icon: LinkedIn,
  },
  {
    hostname: "twitter.com",
    icon: Twitter,
  },
  {
    hostname: "instagram.com",
    icon: InstagramAlt,
  },
  {
    hostname: "microsoft.com",
    icon: Microsoft,
  },
  {
    hostname: "react.dev",
    icon: React,
  },
  {
    hostname: "reddit.com",
    icon: RedditAlienAlt,
  },
  {
    hostname: "youtube.com",
    icon: YouTube,
  },
  {
    hostname: "wordpress.com",
    icon: WordPress,
  },
  {
    hostname: "dribbble.com",
    icon: Dribbble,
  },
];

export default function IconLink({
  children,
  value,
}: Partial<PortableTextComponentProps<PortableTextLink>>) {
  const { href } = value!;
  const isExternal = !href.startsWith("/");
  const rel = isExternal ? "noreferrer noopener" : undefined;
  const target = isExternal ? "_blank" : "_self";

  const supportedSite = sites.find(({ hostname }) => href.includes(hostname));
  const Icon = supportedSite?.icon;
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className="inline-flex items-center gap-[2px]"
    >
      {children}
      {Icon ? (
        <Icon className="size-4" />
      ) : (
        isExternal && <ExternalLink className="size-4" />
      )}
    </Link>
  );
}
