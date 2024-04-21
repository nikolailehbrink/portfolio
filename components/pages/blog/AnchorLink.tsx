"use client";

import LinkAlt from "@/assets/icons/unicons/link-alt.svg";
import { copyToClipboard } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

export default function AnchorLink({ slug }: { slug: string }) {
  return (
    <Link
      href={`#${slug}`}
      className="not-prose lg:absolute lg:-left-8"
      aria-hidden="true"
      tabIndex={-1}
      onClick={async () =>
        await copyToClipboard(location.href, {
          success: () => toast.success("Copied link to clipboard!"),
          error: () => toast.error("Failed to copy link to clipboard!"),
        })
      }
    >
      <LinkAlt className="w-5" />
    </Link>
  );
}
