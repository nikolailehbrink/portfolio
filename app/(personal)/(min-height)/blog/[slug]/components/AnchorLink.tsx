"use client";

import Link from "next/link";
import { toast } from "sonner";

// import LinkAlt from "@/assets/icons/unicons/link-alt.svg";
import { copyToClipboard } from "@/lib/utils";

export default function AnchorLink({ slug }: { slug: string }) {
  return (
    <Link
      href={`#${slug}`}
      className=" lg:absolute lg:-left-7"
      aria-hidden="true"
      tabIndex={-1}
      onClick={async () =>
        await copyToClipboard(location.href, {
          success: () => toast.success("Copied link to clipboard!"),
          error: () => toast.error("Failed to copy link to clipboard!"),
        })
      }
    >
      {/* <LinkAlt className="w-5" /> */}
    </Link>
  );
}
