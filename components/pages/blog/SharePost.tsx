"use client";

import {
  FacebookLogo,
  LinkedinLogo,
  Mailbox,
  RedditLogo,
  WhatsappLogo,
  XLogo,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SharePost({ heading }: { heading: string }) {
  const pathname = usePathname();
  const url = location.origin + pathname;

  const links = [
    {
      site: "X",
      url: `https://x.com/share?text=${heading}&url=${url}`,
      icon: XLogo,
    },
    {
      site: "Reddit",
      url: `https://www.reddit.com/submit?title=${heading}&url=${url}`,
      icon: RedditLogo,
    },
    {
      site: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      icon: LinkedinLogo,
    },
    {
      site: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?t=${heading}&u=${url}`,
      icon: FacebookLogo,
    },
    {
      site: "WhatsApp",
      url: `whatsapp://send?text=${heading}%0A${url}`,
      icon: WhatsappLogo,
    },
    {
      site: "Email",
      url: `mailto:?subject=${heading}&body=Hi there,%0Ahere is an interesting article from Nikolai Lehbrink: %0A%0A${url}%0A%0AEnjoy reading!`,
      icon: Mailbox,
    },
  ];

  return (
    url && (
      <div
        className="inline-flex flex-wrap gap-3 xl:flex-col xl:rounded-lg
          xl:border-2 xl:border-border xl:bg-neutral-800/40 xl:p-2"
      >
        {links.map((link) => (
          <Link
            key={link.site}
            target="_blank"
            rel="noopener noreferrer"
            href={link.url}
            aria-label={`Share on ${link.site}`}
          >
            <link.icon
              className="size-7 opacity-50 hover:opacity-100"
              weight="duotone"
            />
          </Link>
        ))}
      </div>
    )
  );
}
