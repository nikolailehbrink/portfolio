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

export default function SharePost({ heading }: { heading: string }) {
  const url = new URL(location.href);

  const links = [
    {
      site: "X",
      url: `https://x.com/share?text=${heading}&url=${url}`,
      // url: `https://twitter.com/intent/tweet?original_referer=${url.origin}&text=I found a pretty interesting article from Nikolai Lehbrink&url=${url}`,
      icon: XLogo,
    },
    {
      site: "Reddit",
      url: `https://www.reddit.com/submit?url=${url}&title=${heading}`,
      icon: RedditLogo,
    },
    {
      site: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      icon: LinkedinLogo,
    },
    {
      site: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${heading}`,
      icon: FacebookLogo,
    },
    {
      site: "WhatsApp",
      url: `whatsapp://send?text=${url}%0A${heading}`,
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
      <div className="inline-flex flex-wrap gap-3 xl:flex-col xl:rounded-lg xl:border-2 xl:border-border xl:bg-neutral-800/40 xl:p-2">
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